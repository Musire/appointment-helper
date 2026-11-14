import { Pause, Play } from 'lucide-react';

type Props = {
  elapsed: number;
  isRunning: boolean;
  isOnBreak: boolean;
  onPause: () => void;
  onResume: () => void;
};

export default function ServiceTimer({
  elapsed,
  isRunning,
  isOnBreak,
  onPause,
  onResume,
}: Props) {
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="py-6 grid grid-cols-[80%_20%] grid-rows-2">
      <span className="col-start-1">Service Timer</span>

      <button
        type="button"
        onClick={isRunning ? onPause : onResume}
        className="bg-background centered size-20 rounded-lg cursor-pointer row-span-full col-start-2 place-self-end"
      >
        {isRunning ? (
          <Pause className="fill-main" />
        ) : (
          <Play className="fill-main" />
        )}
      </button>

      <p className="flex space-x-2 items-end">
        <span className="text-4xl tabular-nums">
          {String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </span>

        <span>min</span>
      </p>

      {isOnBreak && (
        <span className="text-sm text-else">On break</span>
      )}
    </div>
  );
}