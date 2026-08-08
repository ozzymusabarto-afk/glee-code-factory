import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

const DAILY_GOAL_SECONDS = 10 * 60; // 10 minutes

export function useDailyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isGoalReached, setIsGoalReached] = useState(false);
  const lastSyncRef = useRef<number>(0);

  // Load initial state
  useEffect(() => {
    const init = async () => {
      const todayStr = new Date().toDateString();
      const localSaved = localStorage.getItem(`polybot-timer-${todayStr}`);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('daily_timer_seconds, last_lesson_date')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          const lastDate = profile.last_lesson_date ? new Date(profile.last_lesson_date).toDateString() : null;
          const remoteSeconds = lastDate === todayStr ? (profile.daily_timer_seconds || 0) : 0;
          
          const finalSeconds = Math.max(remoteSeconds, localSaved ? parseInt(localSaved, 10) : 0);
          setSeconds(finalSeconds);
          lastSyncRef.current = finalSeconds;
          if (finalSeconds >= DAILY_GOAL_SECONDS) setIsGoalReached(true);
          return;
        }
      }

      if (localSaved) {
        const parsed = parseInt(localSaved, 10);
        setSeconds(parsed);
        if (parsed >= DAILY_GOAL_SECONDS) setIsGoalReached(true);
      }
    };
    init();
  }, []);

  // Sync to backend periodically
  const syncToBackend = useCallback(async (currentSeconds: number) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const today = new Date().toISOString();
      await supabase
        .from('profiles')
        .update({ 
          daily_timer_seconds: currentSeconds,
          last_lesson_date: today
        })
        .eq('id', session.user.id);
      lastSyncRef.current = currentSeconds;
    }
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && !isGoalReached) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          const today = new Date().toDateString();
          localStorage.setItem(`polybot-timer-${today}`, next.toString());
          
          // Sync every 30 seconds to avoid too many requests
          if (next - lastSyncRef.current >= 30) {
            syncToBackend(next);
          }

          if (next >= DAILY_GOAL_SECONDS) {
            setIsGoalReached(true);
            setIsActive(false);
            syncToBackend(next); // Final sync
          }
          return next;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isGoalReached, syncToBackend]);

  const startTimer = useCallback(() => setIsActive(true), []);
  const pauseTimer = useCallback(() => {
    setIsActive(false);
    syncToBackend(seconds);
  }, [seconds, syncToBackend]);

  const resetGoal = useCallback(async () => {
    setIsGoalReached(false);
    setSeconds(0);
    lastSyncRef.current = 0;
    const todayStr = new Date().toDateString();
    localStorage.removeItem(`polybot-timer-${todayStr}`);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase
        .from('profiles')
        .update({ daily_timer_seconds: 0 })
        .eq('id', session.user.id);
    }
  }, []);

  return {
    seconds,
    isActive,
    isGoalReached,
    startTimer,
    pauseTimer,
    resetGoal,
    remainingSeconds: Math.max(0, DAILY_GOAL_SECONDS - seconds),
  };
}
