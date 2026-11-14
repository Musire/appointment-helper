type ServiceBreak = {
  startedAt: string;
  endedAt: string | null;
};

type Props = {
  breaks: ServiceBreak[];
  now: number;
};

export default function BreaksList({ breaks, now }: Props) {
  function formatTime(timestamp: string) {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function formatDuration(totalSeconds: number) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  return (
    <div className="bg-surface-1 p-6 stacked rounded-lg mb-20">
      <p>Breaks ({breaks.length})</p>

      {breaks.length === 0 ? (
        <span className="text-else text-sm">
          No breaks taken
        </span>
      ) : (
        <div className="stacked divide-y divide-disabled">
          {breaks.map((item, index) => {
            const breakDuration = Math.floor(
              (
                (item.endedAt
                  ? new Date(item.endedAt).getTime()
                  : now) -
                new Date(item.startedAt).getTime()
              ) / 1000
            );

            return (
              <div key={index} className="spaced py-3">
                <div className="stacked">
                  <span className="font-medium">
                    Break {index + 1}
                  </span>

                  <span className="text-sm text-else">
                    {formatTime(item.startedAt)}
                    {' – '}
                    {item.endedAt
                      ? formatTime(item.endedAt)
                      : 'In progress'}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-medium tabular-nums">
                    {formatDuration(breakDuration)}
                  </span>

                  {!item.endedAt && (
                    <p className="text-xs text-else">
                      Active break
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}