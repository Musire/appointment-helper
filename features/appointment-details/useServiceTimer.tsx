
import { useEffect, useState } from "react";

export type ServiceBreak = {
  startedAt: string;
  endedAt: string | null;
};

type ServiceCompletion = {
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
  const [now, setNow] = useState(Date.now());

  // Automatically start the service when the hook mounts.
  useEffect(() => {
    const timestamp = new Date().toISOString();

    setServiceStartedAt(timestamp);
    setRunningSince(timestamp);
    setIsRunning(true);
    setNow(Date.now());
  }, []);

  // Keep timer and active break durations updated.
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Total active service time.
  const elapsed =
    elapsedSeconds +
    (isRunning && runningSince
      ? Math.floor(
          (now - new Date(runningSince).getTime()) / 1000
        )
      : 0);

  const isOnBreak = !isRunning && serviceStartedAt !== null;

  function pauseTimer() {
    if (!runningSince) return;

    const currentTime = Date.now();
    const timestamp = new Date(currentTime).toISOString();

    const sessionSeconds = Math.floor(
      (currentTime - new Date(runningSince).getTime()) / 1000
    );

    // Preserve accumulated service time.
    setElapsedSeconds((prev) => prev + sessionSeconds);

    // Record a new break.
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

  function resumeTimer() {
    if (!serviceStartedAt || isRunning) return;

    const currentTime = Date.now();
    const timestamp = new Date(currentTime).toISOString();

    // Close the latest break.
    setBreaks((prev) =>
      prev.map((item, index) =>
        index === prev.length - 1 && item.endedAt === null
          ? { ...item, endedAt: timestamp }
          : item
      )
    );

    // Resume without resetting elapsed time.
    setRunningSince(timestamp);
    setIsRunning(true);
    setNow(currentTime);
  }

  

  return {
    isRunning,
    isOnBreak,
    serviceStartedAt,
    elapsed,
    breaks,
    now,
    pauseTimer,
    resumeTimer,
  };
}
