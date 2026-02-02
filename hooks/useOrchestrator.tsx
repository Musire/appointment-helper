import { useCallback } from "react";


export default function useOrchestrator<Step extends string>(historyKey: string) {
  const push = useCallback((step: Step) => {
    const history: Step[] = JSON.parse(localStorage.getItem(historyKey) || "[]");
    history.push(step);
    localStorage.setItem(historyKey, JSON.stringify(history));
  }, []);

  const pop = useCallback((): Step | undefined => {
    const history: Step[] = JSON.parse(localStorage.getItem(historyKey) || "[]");
    const last = history.pop();
    localStorage.setItem(historyKey, JSON.stringify(history));
    return last;
  }, []);

  const peek = useCallback((): Step | undefined => {
    const history: Step[] = JSON.parse(localStorage.getItem(historyKey) || "[]");
    return history[history.length - 1];
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(historyKey);
  }, []);

  return { push, pop, peek, clear };
}
