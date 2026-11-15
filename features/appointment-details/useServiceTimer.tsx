
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

export function useServiceTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [serviceStartedAt, setServiceStartedAt] = useState<string | null>(null);
  const [runningSince, setRunningSince] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [breaks, setBreaks] = useState<ServiceBreak[]>([]);
  const [now, setNow] = useState(0);

  // Keep timer updated.
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Total active service time.
  const elapsed =
    elapsedSeconds +
    (isRunning && runningSince && now
      ? Math.floor(
          (now - new Date(runningSince).getTime()) / 1000
        )
      : 0);

  const isOnBreak = !isRunning && serviceStartedAt !== null;

  // Start service.
  function startTimer() {
    if (serviceStartedAt) return;

    const currentTime = Date.now();
    const timestamp = new Date(currentTime).toISOString();

    setServiceStartedAt(timestamp);
    setRunningSince(timestamp);
    setIsRunning(true);
    setNow(currentTime);
  }

  // Pause service.
  function pauseTimer() {
    if (!runningSince || !isRunning) return;

    const currentTime = Date.now();
    const timestamp = new Date(currentTime).toISOString();

    const sessionSeconds = Math.floor(
      (currentTime - new Date(runningSince).getTime()) / 1000
    );

    setElapsedSeconds((prev) => prev + sessionSeconds);

    setBreaks((prev) => [
      ...prev,
      {
        startedAt: timestamp,
        endedAt: null,
      },
    ]);

    setRunningSince(null);
    setIsRunning(false);
    setNow(currentTime);
  }

  // Resume service.
  function resumeTimer() {
    if (!serviceStartedAt || isRunning) return;

    const currentTime = Date.now();
    const timestamp = new Date(currentTime).toISOString();

    setBreaks((prev) =>
      prev.map((item, index) =>
        index === prev.length - 1 && item.endedAt === null
          ? { ...item, endedAt: timestamp }
          : item
      )
    );

    setRunningSince(timestamp);
    setIsRunning(true);
    setNow(currentTime);
  }

  // Complete service.
  function completeTimer(): ServiceCompletion | null {
    if (!serviceStartedAt) return null;

    const currentTime = Date.now();
    const timestamp = new Date(currentTime).toISOString();

    let finalElapsed = elapsedSeconds;
    let finalBreaks = breaks;

    if (isRunning && runningSince) {
      finalElapsed += Math.floor(
        (currentTime - new Date(runningSince).getTime()) / 1000
      );
    } else if (isOnBreak) {
      finalBreaks = breaks.map((item, index) =>
        index === breaks.length - 1 && item.endedAt === null
          ? { ...item, endedAt: timestamp }
          : item
      );
    }

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
