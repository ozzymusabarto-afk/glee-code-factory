import { useState, useEffect, useCallback } from 'react';

const DAILY_GOAL_SECONDS = 10 * 60; // 10 minutes

export function useDailyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isGoalReached, setIsGoalReached] = useState(false);

  useEffect(() => {
    // Load persisted time for today
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`polybot-timer-${today}`);
    if (saved) {
      const parsed = parseInt(saved, 10);
      setSeconds(parsed);
      if (parsed >= DAILY_GOAL_SECONDS) {
        setIsGoalReached(true);
      }
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
          
          if (next >= DAILY_GOAL_SECONDS) {
            setIsGoalReached(true);
            setIsActive(false);
          }
          return next;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isGoalReached]);

  const startTimer = useCallback(() => setIsActive(true), []);
  const pauseTimer = useCallback(() => setIsActive(false), []);
  const resetGoal = useCallback(() => {
    setIsGoalReached(false);
    setSeconds(0);
    const today = new Date().toDateString();
    localStorage.removeItem(`polybot-timer-${today}`);
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
