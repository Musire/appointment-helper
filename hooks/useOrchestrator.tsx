import { useCallback } from "react";

export default function useOrchestrator<Step extends string>(
  historyKey: string
) {
  // 🔑 Wrapped in useCallback to provide a stable reference for the compiler
  const getHistory = useCallback((): Step[] => {
    try {
      return JSON.parse(localStorage.getItem(historyKey) || "[]");
    } catch {
      return [];
    }
  }, [historyKey]);

  const push = useCallback(
    (step: Step) => {
      const history = getHistory();
      history.push(step);
      localStorage.setItem(historyKey, JSON.stringify(history));
    },
    [historyKey, getHistory] // ✨ Added getHistory here
  );

  const pop = useCallback((): Step | undefined => {
    const history = getHistory();
    const last = history.pop();
    localStorage.setItem(historyKey, JSON.stringify(history));
    return last;
  }, [historyKey, getHistory]); // ✨ Added getHistory here

  const peek = useCallback((): Step | undefined => {
    const history = getHistory();
    return history[history.length - 1];
  }, [getHistory]); // ✨ Uses getHistory (which already tracks historyKey)

  const clear = useCallback(() => {
    localStorage.removeItem(historyKey);
  }, [historyKey]);

  return { push, pop, peek, clear };
}
