import { storeHours } from '@/domains/store/store.types';
import { toMeridiem } from '@/lib/utils/timeConversion';
import { Clock } from 'lucide-react';

export type DaySchedule = {
  day: string;
  start: string | null;
  end: string | null;
};

type StoreHoursSummaryProps = {
  storeHours: storeHours[];
};

export function StoreHoursSummary({
  storeHours,
}: StoreHoursSummaryProps) {
  const openDays = storeHours.filter(
    ({ start, end }) => start !== null && end !== null
  ).length;

  return (
    <section
      aria-labelledby="store-hours-heading"
      className="rounded-xl border border-border bg-surface-1 text-main p-4"
    >
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock
            aria-hidden="true"
            className="size-4 text-else"
          />
          <h2
            id="store-hours-heading"
            className="font-semibold"
          >
            Operating hours
          </h2>
        </div>

        <span className="text-xs text-else">
          {openDays} days open
        </span>
      </header>

      <dl className="divide-y divide-border">
        {storeHours.map(({ day, start, end }) => {
          const isOpen = start !== null && end !== null;

          return (
            <div
              key={day}
              className="flex items-center justify-between gap-4 py-3"
            >
              <dt className="text-xs font-medium ">
                {day}
              </dt>

              <dd className="flex items-center gap-2">
                <span
                  className={
                    isOpen
                      ? 'text-sm text-else'
                      : 'text-sm text-disabled'
                  }
                >
                  {isOpen
                    ? `${toMeridiem(Number(start) * 60)} – ${toMeridiem(Number(end) * 60)}`
                    : 'Closed'}
                </span>

                <span
                  aria-label={isOpen ? 'Open' : 'Closed'}
                  className={`size-2 rounded-full ${
                    isOpen ? 'bg-success' : 'bg-disabled'
                  }`}
                />
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}