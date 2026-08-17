'use client';

import { AlternateDate, SlotSelector, WeeklySelector } from "@/features/booking/components";
import { parseTo24H } from "@/lib/dayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { getDatetime } from "../../actions/booking.action";
import { ContinueButton } from "../page";

type timeslot = {
    id: string;
    time: string;
}

type Props = {
  initialSlots: timeslot[];
  storeId: string;
  barberId: string;
}

export default function DateTimeStep ({ 
    initialSlots,
    storeId,
    barberId
}: Props) {
    const router = useRouter()

    const [timeslots, setTimeslots] = useState<timeslot[]>(initialSlots);
  
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [time, setTime] = useState<string>(initialSlots[0]?.time ?? '09:00 AM');
   
    const [isPending, startTransition] = useTransition();

    function handleDateChange(newDate: Dayjs) {
        startTransition(async () => {
            setSelectedDate(newDate);

            const response = await getDatetime(storeId, barberId, newDate.toDate());
            
            if (response.success && response.data) {
                setTimeslots(response.data);
            }
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
                    const datePart = selectedDate.format("YYYY-MM-DD");
                    const timePart = parseTo24H(time) ;
                    const combinedZoneTime = dayjs.tz(`${datePart} ${timePart}`)
                    
                    return combinedZoneTime.toISOString();
                })()}
            />
        </div>
    )
}