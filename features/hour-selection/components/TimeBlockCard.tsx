
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
    <div className="relative flex flex-col space-y-4 bg-darkest border-adjust p-6">
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

      {/* Days of the week */}
      <Controller
        name={`blocks.${index}.days`}
        control={control}
        render={({ field }) => {
          const selectedDays = (field.value ?? []) as Day[];

          return (
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {DAYS.map((day) => {
                const checked = selectedDays.includes(day.value);

                return (
                  <label
                    key={day.value}
                    className="mr-1 flex cursor-pointer items-center space-x-1"
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
                      className="peer size-3.5 cursor-pointer appearance-none border-2 border-whitesmoke/20 bg-black checked:bg-whitesmoke/87"
                    />

                    <span
                      className={`capitalize ${
                        checked
                          ? 'text-whitesmoke/87'
                          : 'text-whitesmoke/30'
                      }`}
                    >
                      {day.label}
                    </span>
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
        className="absolute right-2 top-2 size-6 rounded-full border-2 border-whitesmoke/37 text-xs hover:cursor-pointer hover:border-error-dark hover:text-error-dark"
      >
        X
      </button>
    </div>
  );
}
