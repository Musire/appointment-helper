'use client';

import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TimeBlock } from '../model/types';
import { consolidate, validate } from '../model/validation';
import TimeBlockCard from './TimeBlockCard';
import { getOverlapError } from '../model/time.utils';

export default function BusinessHoursForm() {
  const [blocks, setBlocks] = useState<TimeBlock[]>([])
  const [errors, setErrors] = useState<any>(null)

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

  function handleSubmit() {
    setErrors(null)
    const result = validate(blocks)

    if (!result.isValid) {
      setErrors(result)
      return
    }

    const submission = consolidate(blocks)
    console.log('Submitting:', submission)
  }

  return (
    <div className='flex flex-col space-y-6'>
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
          onClick={handleSubmit}
          className='btn'>
          Save
        </button>
      </div>
    </div>
  )
}