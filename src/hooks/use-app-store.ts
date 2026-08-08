import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';

export type AppMode = 'adult' | 'kids';

interface AppState {
  appMode: AppMode;
  skillLevel: number;
  displayName: string;
  setAppMode: (mode: AppMode) => void;
  setSkillLevel: (level: number) => void;
  setDisplayName: (name: string) => void;
  syncProfile: () => Promise<void>;
  updateStreak: () => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      appMode: 'kids',
      skillLevel: 1,
      displayName: '',
      setAppMode: async (mode) => {
        set({ appMode: mode });
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          try {
            await supabase
              .from('profiles')
              .update({ app_mode: mode })
              .eq('id', session.user.id);
          } catch (e) {
            console.log("Dev: Table update skipped (Auth Bypass)");
          }
        }
      },
      setSkillLevel: async (level) => {
        set({ skillLevel: level });
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          try {
            await supabase
              .from('profiles')
              .update({ skill_level: level })
              .eq('id', session.user.id);
          } catch (e) {
            console.log("Dev: Table update skipped (Auth Bypass)");
          }
        }
      },
      setDisplayName: async (name) => {
        set({ displayName: name });
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          try {
            await supabase
              .from('profiles')
              .update({ display_name: name })
              .eq('id', session.user.id);
          } catch (e) {
            console.log("Dev: Table update skipped (Auth Bypass)");
          }
        }
      },
      syncProfile: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data, error } = await supabase
            .from('profiles')
            .select('app_mode, skill_level, display_name')
            .eq('id', session.user.id)
            .single();
          
          if (data && !error) {
            set({ 
              appMode: (data.app_mode as AppMode) || 'kids',
              skillLevel: data.skill_level || 1,
              displayName: data.display_name || ''
            });
          }
        }
      },
      updateStreak: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const today = new Date().toISOString().split('T')[0];
          const { data: profile } = await supabase
            .from('profiles')
            .select('last_lesson_date, streak_count')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const lastDate = profile.last_lesson_date ? new Date(profile.last_lesson_date).toISOString().split('T')[0] : null;
            
            if (lastDate !== today) {
              const isYesterday = lastDate === new Date(Date.now() - 86400000).toISOString().split('T')[0];
              const newStreak = isYesterday ? (profile.streak_count || 0) + 1 : 1;
              
              await supabase
                .from('profiles')
                .update({ 
                  streak_count: newStreak, 
                  last_lesson_date: new Date().toISOString() 
                })
                .eq('id', session.user.id);
            }
          }
        }
      }
    }),
    {
      name: 'polybot-storage',
    }
  )
);

