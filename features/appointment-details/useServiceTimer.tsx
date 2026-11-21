
import { useEffect, useState } from "react";

export type ServiceBreak = {
  startedAt: string;
  endedAt: string | null;
};

export type ServiceCompletion = {
  serviceStartedAt: string;
  completedAt: string;
  durationSeconds: number;
  breaks: ServiceBreak[];
};

type StartedAt = string | Date | null | undefined;

function normalizeTimestamp(value: StartedAt): string | null {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function useServiceTimer(startedAt: StartedAt) {
  const initialTimestamp = normalizeTimestamp(startedAt);

  // Pure initial state.
  const [serviceStartedAt, setServiceStartedAt] =
    useState<string | null>(initialTimestamp);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [isRunning, setIsRunning] = useState(
    initialTimestamp !== null
  );

  // A persisted timer starts from its database timestamp.
  const [runningSince, setRunningSince] = useState<number | null>(
    initialTimestamp ? new Date(initialTimestamp).getTime() : null
  );

  const [breaks, setBreaks] = useState<ServiceBreak[]>([]);

  // No impure initialization during render.
  const [now, setNow] = useState(0);

  // Clock subscription.
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Active service duration.
  const elapsed =
    elapsedSeconds +
    (isRunning && runningSince !== null && now > 0
      ? Math.max(0, Math.floor((now - runningSince) / 1000))
      : 0);

  const isOnBreak = breaks.some(
    item => item.endedAt === null
  );

  // Start.
  function startTimer() {
    if (serviceStartedAt) return;

    const currentTime = Date.now();

    setServiceStartedAt(new Date(currentTime).toISOString());
    setElapsedSeconds(0);
    setRunningSince(currentTime);
    setIsRunning(true);
    setNow(currentTime);
  }

  // Pause.
  function pauseTimer() {
    if (!isRunning || runningSince === null) return;

    const currentTime = Date.now();

    const sessionSeconds = Math.max(
      0,
      Math.floor((currentTime - runningSince) / 1000)
    );

    setElapsedSeconds(prev => prev + sessionSeconds);

    setBreaks(prev => [
      ...prev,
      {
        startedAt: new Date(currentTime).toISOString(),
        endedAt: null,
      },
    ]);

    setRunningSince(null);
    setIsRunning(false);
    setNow(currentTime);
  }

  // Resume.
  function resumeTimer() {
    if (!serviceStartedAt || isRunning) return;

    const currentTime = Date.now();
    const timestamp = new Date(currentTime).toISOString();

    setBreaks(prev =>
      prev.map(item =>
        item.endedAt === null
          ? { ...item, endedAt: timestamp }
          : item
      )
    );

    setRunningSince(currentTime);
    setIsRunning(true);
    setNow(currentTime);
  }

  // Complete.
  function completeTimer(): ServiceCompletion | null {
    if (!serviceStartedAt) return null;

    const currentTime = Date.now();
    const timestamp = new Date(currentTime).toISOString();

    const finalElapsed =
      elapsedSeconds +
      (isRunning && runningSince !== null
        ? Math.max(
            0,
            Math.floor((currentTime - runningSince) / 1000)
          )
        : 0);

    const finalBreaks = breaks.map(item =>
      item.endedAt === null
        ? { ...item, endedAt: timestamp }
        : item
    );

    const completion: ServiceCompletion = {
      serviceStartedAt,
      completedAt: timestamp,
      durationSeconds: finalElapsed,
      breaks: finalBreaks,
    };

    setIsRunning(false);
    setRunningSince(null);
    setElapsedSeconds(finalElapsed);
    setBreaks(finalBreaks);
    setNow(currentTime);

    return completion;
  }

  return {
    isRunning,
    isOnBreak,
    serviceStartedAt,
    elapsed,
    breaks,
    now,
    startTimer,
    pauseTimer,
    resumeTimer,
    completeTimer,
  };
}
