'use client';

import { AlternateDate, SlotSelector, WeeklySelector } from "@/features/booking/components";
import { parseTo24H } from "@/lib/dayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { getDatetime } from "../../../../domains/booking/booking.actions";
import { ContinueButton } from "../page";


type Props = {
  initialSlots: number[];
  storeId: string;
  barberId: string;
}

export default function DateTimeStep ({ 
    initialSlots,
    storeId,
    barberId
}: Props) {
    const router = useRouter()

    const [timeslots, setTimeslots] = useState<number[]>(initialSlots);
  
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [time, setTime] = useState<number>(initialSlots[0] ?? 0);
   
    const [isPending, startTransition] = useTransition();

    function handleDateChange(newDate: Dayjs) {
        startTransition(async () => {
            setSelectedDate(newDate);

            const res = await getDatetime({
                storeId, 
                staffId: barberId, 
                targetDate: newDate.toDate()});
            
            if (res.success && res.data) {
                setTimeslots(res.data);
            }

            if (!res.success && res.error === "staff member has not set up availability times") {
                setTimeslots([])
            }

            console.log(res)
        });
    }
        
    return (
        <div className="w-full flex flex-col space-y-6">
            <h3 className="text-primary">{`Step ${4} of ${5}`}</h3>
            <WeeklySelector 
                {...{selectedDate}}
                onSelect={handleDateChange}
            />
            <AlternateDate
                selected={selectedDate}
                onSelect={handleDateChange}
            />
            <SlotSelector 
                slots={timeslots} 
                selectedTime={time}
                onSelect={setTime}    
            />
            <ContinueButton 
                onBack={() => router.back()} 
                next="review" 
                selected={(() => {
                    const datePart = selectedDate.toISOString();
                    return `${datePart} ${time}`
                })()}
            />
        </div>
    )
}