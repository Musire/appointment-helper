'use client';

import { DatePickerButton } from "@/components/ui/date-picker";
import { useMemo, useState } from "react";
import { AppointmentDetails } from "../../queries/getAppointmentDetails";
import PoolDisplay from "./PoolDisplay";
import PoolFilter from "./PoolFilter";
import dayjs from "dayjs";

export type OptionType = 'all' |
    'checkedin' |
    'pending' |
    'cancelled' |
    'noshow' | 
    'inprogress' |
    'completed'


type Props = {
    appointments: AppointmentDetails[]
}

export default function PoolPage ({ 
    appointments 
}: Props) {
    const [ selected, setSelected ] = useState<string[]>(['all']);
    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD") );

    const options = ['all', 'checkedin', 'pending', 'cancelled', 'noshow', 'inprogress', 'completed'] as OptionType[]


    const handleSelect = (value:string) => {
        setSelected(prev => {
            if (prev.includes('all')) {
                if (value === 'all') {
                    return []
                }
                return [value]
            }

            if (value === 'all') {
                return ['all']
            }

            if (prev.includes(value)) {
                return prev.filter(a => a !== value)
            }

            return [...prev, value]
        })
    }

    const handleDateSelect = (date: string) => {
        if (!date) return;
        setSelectedDate(date);
    };

    const filteredAppointments = useMemo(() => {
        if (!selected.length) {
            return [];
        }

        return appointments.filter((appointment) => {
            const matchesStatus =
                selected.includes("all") ||
                selected.includes(appointment.status);

            const matchesDate =
                dayjs(appointment.scheduledAt).format("YYYY-MM-DD") === selectedDate;
            console.log(dayjs(appointment.scheduledAt).format("YYYY-MM-DD"))

            return matchesStatus && matchesDate;
        });
    }, [appointments, selected, selectedDate]);

    console.log(selectedDate)


    return (
        <div className="flex-1 grid grid-cols-1 grid-rows-[5rem_1fr] overflow-y-hidden">
            <div className="col-start-1 row-start-1 flex items-center space-x-2">
                <DatePickerButton 
                    selectedDate={selectedDate} 
                    onChange={handleDateSelect} 
                />
                <PoolFilter 
                    options={options}
                    selected={selected} 
                    onSelect={handleSelect}
                />
            </div>
            <PoolDisplay 
                appointments={filteredAppointments} 
            />
        </div>
    );
}