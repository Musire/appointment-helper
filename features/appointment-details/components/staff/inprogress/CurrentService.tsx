import ServiceTimer from './ServiceTimer';

type Props = {
  serviceStartedAt: string | null;
  isRunning: boolean;
  isOnBreak: boolean;
  elapsed: number;
  onPause: () => void;
  onResume: () => void;
};

export default function CurrentService({
  serviceStartedAt,
  isRunning,
  isOnBreak,
  elapsed,
  onPause,
  onResume,
}: Props) {
  function formatTime(timestamp: string) {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className="divide-y divide-disabled bg-surface-1 p-6 rounded-xl">
      <div className="py-6 stacked">
        <p className="spaced">
          <span>Current Service</span>

          <span className="text-sm text-else">
            {serviceStartedAt
              ? `Started at ${formatTime(serviceStartedAt)}`
              : 'Starting...'}
          </span>
        </p>

        <div className="flex space-x-6">
          <div className="size-20 rounded-full bg-background" />

          <p className="evenly-col items-start">
            <span className="font-medium text-lg">
              Juan Dela Cruz
            </span>

            <span className="text-else">
              Fade Haircut
            </span>
          </p>
        </div>
      </div>

      <ServiceTimer
        elapsed={elapsed}
        isRunning={isRunning}
        isOnBreak={isOnBreak}
        onPause={onPause}
        onResume={onResume}
      />
    </div>
  );
}