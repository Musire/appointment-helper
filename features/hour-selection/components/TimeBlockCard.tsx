'use client';

import type { FieldError } from 'react-hook-form';
import { Controller, get, useFormContext } from 'react-hook-form';

import TimePicker from '@/components/ui/timepicker/TimePicker';
import { Day } from '@/domains/offering/offering.types';
import { toMins } from '@/lib/utils/time';
import { fromMins } from '../../../lib/utils/time.utils';

type Props = {
  index: number;
  onDelete: () => void;
};

const DAYS = [
  { value: 'sun', label: 'Do' },
  { value: 'mon', label: 'Lu' },
  { value: 'tue', label: 'Ma' },
  { value: 'wed', label: 'Mi' },
  { value: 'thu', label: 'Ju' },
  { value: 'fri', label: 'Vi' },
  { value: 'sat', label: 'Sa' },
] as const;

export default function TimeBlockCard({
  index,
  onDelete,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const blockErrors = get(
    errors,
    `blocks.${index}`,
  ) as Record<string, FieldError | undefined> | undefined;

  return (
    <div className="relative w-full flex flex-col space-y-4 bg-surface-1 border-adjust p-6">

      {/* Start and end times */}
      <div className="flex space-x-6">
        {(['start', 'end'] as const).map((field, fieldIndex) => (
          <span
            key={`${field}-${fieldIndex}`}
            className="flex w-1/2 flex-col space-y-2"
          >
            <p className="capitalize text-whitesmoke/87">
              {field}
            </p>

            <Controller
              name={`blocks.${index}.${field}`}
              control={control}
              render={({ field: rhfField }) => (
                <TimePicker
                  value={
                    rhfField.value != null
                      ? fromMins(rhfField.value)
                      : ''
                  }
                  onChange={(value: string) => {
                    rhfField.onChange(
                      value ? toMins(value) : undefined,
                    );
                  }}
                  interval={15}
                  startTime="12:00 AM"
                  endTime="11:59 PM"
                  buttonStyle="rounded-none"
                  dropdownStyle="rounded-none"
                />
              )}
            />

            {blockErrors?.[field]?.message && (
              <p className="text-sm text-error-dark">
                {blockErrors[field]?.message}
              </p>
            )}
          </span>
        ))}
      </div>

      {/* Days of the week - Selectable chips */}
      <Controller
        name={`blocks.${index}.days`}
        control={control}
        render={({ field }) => {
          const selectedDays = (field.value ?? []) as Day[];

          return (
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => {
                const checked = selectedDays.includes(day.value);

                return (
                  <label
                    key={day.value}
                    className={`
                      flex h-9 min-w-10 w-1/8 items-center justify-center
                      rounded-md border px-3
                      cursor-pointer select-none
                      text-sm font-medium
                      transition-colors duration-150
                      ${
                        checked
                          ? 'border-whitesmoke/70 bg-whitesmoke/20 text-main'
                          : 'border-whitesmoke/15 bg-transparent text-whitesmoke/40 hover:border-whitesmoke/40 hover:text-whitesmoke/80'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        field.onChange(
                          checked
                            ? selectedDays.filter(
                                (d) => d !== day.value,
                              )
                            : [...selectedDays, day.value],
                        );
                      }}
                      className="sr-only"
                    />

                    {day.label}
                  </label>
                );
              })}
            </div>
          );
        }}
      />

      {blockErrors?.days?.message && (
        <p className="text-sm text-error-dark">
          {blockErrors.days.message}
        </p>
      )}

      {/* Additional block-level errors */}
      {Object.entries(blockErrors ?? {}).map(([key, error]) => {
        if (
          ['start', 'end', 'days', 'id'].includes(key) ||
          !error?.message
        ) {
          return null;
        }

        return (
          <p key={key} className="text-sm text-error-dark">
            {error.message}
          </p>
        );
      })}

      {/* Delete block */}
      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete time block"
        className="
          absolute right-2 top-2
          size-8 rounded-full
          border-2 border-whitesmoke/37
          text-xs
          hover:cursor-pointer
          hover:border-error-dark
          hover:text-error-dark
          transition-colors  hover:bg-error/20 
        "
      >
        X
      </button>
    </div>
  );
}