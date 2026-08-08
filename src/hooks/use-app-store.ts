import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppMode = 'adult' | 'kids';

interface AppState {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      appMode: 'adult',
      setAppMode: (mode) => set({ appMode: mode }),
    }),
    {
      name: 'polybot-storage',
    }
  )
);
