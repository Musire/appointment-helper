'use client';

import { SuccessDisplay } from '@/domains/booking';
import { saveBusinessHours } from '@/domains/staff-store/actions/staffStore.action';
import { useActionState, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { getOverlapError } from '../model/time.utils';
import { TimeBlock } from '../model/types';
import { validate } from '../model/validation';
import TimeBlockCard from './TimeBlockCard';
import { hasValidationError } from '../model/error.utils';

export default function BusinessHoursForm() {
  const [blocks, setBlocks] = useState<TimeBlock[]>([{
    id: uuid(),
    start: 540,
    end: 1020,
    days: [],
  }])
  const [errors, setErrors] = useState<any>(null)
  const [ state, formAction, pending ] = useActionState(
    saveBusinessHours,
    { success: false, error: undefined }
  )

  function addBlock() {
    setBlocks(prev => [
      ...prev,
      {
        id: uuid(),
        start: 540,
        end: 1020,
        days: [],
      },
    ])
  }

  function updateBlock(updated: TimeBlock) {
    setBlocks(prev =>
      prev.map(b => (b.id === updated.id ? updated : b))
    )
  }

  function deleteBlock(id: string) {
    setBlocks(prev => prev.filter(b => b.id !== id))
  }

  function handleSubmit(e:any) {
    setErrors(null)
    const result = validate(blocks)

    if (!result.isValid) {
      e.preventDefault()
      setErrors(result)
      return
    }
  }

  console.log(state)

  const hasClientError = hasValidationError(errors)
  const hasServerError = !!state?.error

  const anyError = hasClientError || hasServerError

  return (
    <>
    {!state.success && (
      <form action={formAction} onSubmit={handleSubmit} className='flex flex-col space-y-6'>
        <h2 className="">Select store availability</h2>
        <input type="hidden" name="blocks" value={JSON.stringify(blocks)} />
        {blocks.map(block => (
          <TimeBlockCard
            key={block.id}
            block={block}
            onChange={updateBlock}
            onDelete={() => deleteBlock(block.id)}
            errors={errors?.blockErrors?.[block.id]}
          />
        ))}
        <p className="text-error-dark">{getOverlapError(errors?.dayOverlapErrors)}</p>
        <div className="spaced">
          <button 
            onClick={addBlock}
            className='btn w-40'>
            Add Block
          </button>
          <button 
            type="submit"
            disabled={pending}
            className={`btn disabled:cursor-disabled ${anyError ? "bg-red-600/10 text-error-dark border-error-dark hover:bg-red-800/50 hover:text-red-200" : ""}`}>
            {pending ? "Saving..." : anyError ? "Retry":  "Save"}
          </button>
        </div>
      </form>
    )}
    {state.success && (
      <SuccessDisplay />
    )}
    </>
  )
}