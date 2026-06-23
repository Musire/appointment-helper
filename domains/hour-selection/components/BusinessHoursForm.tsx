'use client';

import { SuccessDisplay } from '@/domains/booking';
import { saveBusinessHours } from '@/domains/staff-store/actions/staffStore.action';
import { useActionState, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { hasValidationError } from '../model/error.utils';
import { getOverlapError } from '../model/time.utils';
import { TimeBlock } from '../model/types';
import { validate } from '../model/validation';
import TimeBlockCard from './TimeBlockCard';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  initialBlocks?: TimeBlock[];
};

export default function BusinessHoursForm({
  initialBlocks,
}: Props) {
  const [blocks, setBlocks] = useState<TimeBlock[]>(
    initialBlocks?.length
      ? initialBlocks
      : [
          {
            id: uuid(),
            start: 540,
            end: 1020,
            days: [],
          },
        ]
  );

  const [errors, setErrors] = useState<any>(null);

  const [state, formAction, pending] = useActionState(
    saveBusinessHours,
    { success: false, error: undefined }
  );

  function addBlock() {
    setBlocks(prev => [
      ...prev,
      {
        id: uuid(),
        start: 540,
        end: 1020,
        days: [],
      },
    ]);
  }

  function updateBlock(updated: TimeBlock) {
    setBlocks(prev =>
      prev.map(block =>
        block.id === updated.id ? updated : block
      )
    );
  }

  function deleteBlock(id: string) {
    setBlocks(prev =>
      prev.filter(block => block.id !== id)
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setErrors(null);

    const result = validate(blocks);

    if (!result.isValid) {
      e.preventDefault();
      setErrors(result);
      return;
    }
  }

  const hasClientError = hasValidationError(errors);
  const hasServerError = !!state?.error;
  const anyError = hasClientError || hasServerError;

  return (
    <>
      {!state.success && (
        <form
          action={formAction}
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 py-6"
        >
          <Button
            type="button"
            onClick={addBlock}
            className="centered size-10"
          >
            <Plus />
          </Button>
          <input
            type="hidden"
            name="blocks"
            value={JSON.stringify(blocks)}
          />
          {blocks.map(block => (
            <TimeBlockCard
              key={block.id}
              block={block}
              onChange={updateBlock}
              onDelete={() => deleteBlock(block.id)}
              errors={errors?.blockErrors?.[block.id]}
            />
          ))}

          <p className="text-error-dark">
            {getOverlapError(errors?.dayOverlapErrors)}
          </p>
          <Button
            type="submit"
            disabled={pending}
            className={`btn disabled:cursor-disabled self-end ${
              anyError
                ? 'bg-red-600/10 text-error-dark border-error-dark hover:bg-red-800/50 hover:text-red-200'
                : ''
            }`}
          >
            {pending
              ? 'Saving...'
              : anyError
              ? 'Retry'
              : 'Save'}
          </Button>
        </form>
      )}

      {state.success && <SuccessDisplay />}
    </>
  );
}