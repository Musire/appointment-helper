import { useCallback } from "react";

export default function useOrchestrator<Step extends string>(
  historyKey: string
) {
  const getHistory = (): Step[] => {
    try {
      return JSON.parse(localStorage.getItem(historyKey) || "[]");
    } catch {
      return [];
    }
  };

  const push = useCallback(
    (step: Step) => {
      const history = getHistory();
      history.push(step);
      localStorage.setItem(historyKey, JSON.stringify(history));
    },
    [historyKey]
  );

  const pop = useCallback((): Step | undefined => {
    const history = getHistory();
    const last = history.pop();
    localStorage.setItem(historyKey, JSON.stringify(history));
    return last;
  }, [historyKey]);

  const peek = useCallback((): Step | undefined => {
    const history = getHistory();
    return history[history.length - 1];
  }, [historyKey]);

  const clear = useCallback(() => {
    localStorage.removeItem(historyKey);
  }, [historyKey]);

  return { push, pop, peek, clear };
}