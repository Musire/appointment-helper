'use client';

import { AlternateDate, SlotSelector, WeeklySelector } from "@/domains/booking/components";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import { ContinueButton, Header, Indicator } from "../page";


dayjs.extend(utc)
dayjs.extend(timezone)

type DateTimeStepProps = {
    onBack: () => void;
    onChange: (v: string) => void;
    steps: string[];
}

const testSlots = [
  { id: 'slot-1', time: '10:00' },
  { id: 'slot-2', time: '11:00' },
  { id: 'slot-3', time: '12:00' },
  { id: 'slot-4', time: '13:00' },
  { id: 'slot-5', time: '14:00' },
  { id: 'slot-6', time: '15:00' },
  { id: 'slot-7', time: '16:00' },
  { id: 'slot-8', time: '17:00' }
]

export default function DateTimeStep ({ onBack, onChange, steps }: DateTimeStepProps) {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [time, setTime] = useState<string>('10:00');
    
    const handleContinue = () => {
        const local = dayjs.tz(
            `${selectedDate.format("YYYY-MM-DD")} ${time}`,
            'America/Guatemala'
        )

        const utc = local.utc().toISOString()
        onChange(utc)
    }

    
    return (
        <div className="w-full flex flex-col space-y-6">
            <Header onBack={onBack} title={'Select Date and Time'} />
            <Indicator {...{steps}} index={4} />
            <WeeklySelector 
                {...{selectedDate}}
                onSelect={setSelectedDate}
            />
            <AlternateDate
                selected={selectedDate}
                onSelect={setSelectedDate}
            />
            <SlotSelector 
                slots={testSlots} 
                selectedTime={time}
                onSelect={setTime}    
            />
            <ContinueButton onContinue={handleContinue} />
        </div>
    )
}