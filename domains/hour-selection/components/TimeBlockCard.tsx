'use client';

import { DropdownButton } from '@/components/UI/buttons';
import { Clock } from 'lucide-react';
import { Day, TimeBlock } from '../model/types';
import { toMins } from '@/lib/time';
import { fromMins } from '../model/time.utils';

type Props = {
  block: TimeBlock
  onChange: (block: TimeBlock) => void
  onDelete: () => void
  errors?: string[]
}

const DAYS: Day[] = ['sun','mon','tue','wed','thu','fri','sat']

export default function TimeBlockCard({
  block,
  onChange,
  onDelete,
  errors,
}: Props) {

  function toggleDay(day: Day) {
    const exists = block.days.includes(day)
    const updatedDays = exists
      ? block.days.filter(d => d !== day)
      : [...block.days, day]

    onChange({ ...block, days: updatedDays })
  }

  function updateTime(type: 'start' | 'end', value: number) {
    onChange({ ...block, [type]: value })
  }

  return (
    <div className='flex-col flex space-y-4 bg-darker p-6 relative'>
      <div className='flex space-x-6'>
        <span className="flex-col flex space-y-2 w-1/2">
          <p className="capitalize">start</p>
          <DropdownButton
            value={fromMins(block.start)}
            onChange={(v: string | string[]) => updateTime('start', toMins(v))}
            Icon={Clock} 
            options={['10:00 AM']} 
            buttonStyle='rounded-none'
            drawerStyle='rounded-none'
          />
        </span>
        <span className="flex-col flex space-y-2 w-1/2">
          <p className="capitalize">end</p>
          <DropdownButton
            value={fromMins(block.end)}
            onChange={(v: string | string[]) => updateTime('end', toMins(v))}
            Icon={Clock} 
            options={['05:00 PM']} 
            buttonStyle='rounded-none'
            drawerStyle='rounded-none'
          />
        </span>
      </div>
      <div className='flex'>
        {DAYS.map(day => (
          <label key={day} className='capitalize mr-4 flex items-center space-x-1'>
            <input
              type="checkbox"
              checked={block.days.includes(day)}
              onChange={() => toggleDay(day)}
              className="appearance-none size-3.5 bg-black border-2 border-whitesmoke/20 checked:bg-whitesmoke/87 peer "
            />
            <p className="peer-checked:text-whitesmoke/87 text-whitesmoke/30">{day}</p>
          </label>
        ))}
      </div>

      {errors && errors.map(err => (
        <div key={err} className='text-error-dark'>{err}</div>
      ))}

      <button 
        onClick={onDelete}
        className='hover:cursor-pointer rounded-full hover:text-error-dark absolute top-2 right-2 border-2 border-whitesmoke/37 size-6 text-xs hover:border-error-dark'>
        X
      </button>
    </div>
  )
}