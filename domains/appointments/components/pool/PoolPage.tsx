'use client';

import { useMemo, useState } from "react";
import { AppointmentDetails } from "../../queries/getAppointmentDetails";
import PoolDisplay from "./PoolDisplay";
import PoolFilter from "./PoolFilter";

type Props = {
    appointments: AppointmentDetails[]
}

export default function PoolPage ({ 
    appointments 
}: Props) {
    const [ selected, setSelected ] = useState<string[]>(['all']);
    const options = ['all', 'checkedin', 'pending', 'cancelled', 'noshow', 'inprogress', 'completed']
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

    const filteredAppointments = useMemo(() => {
        if (!selected.length) {
            return []
        }
        if (selected.includes('all')) {
            return appointments
        }
        return appointments.filter(a => selected.includes(a.status) )

    }, [selected])
    return (
        <div className="flex-1 grid grid-cols-1 grid-rows-[5rem_1fr] overflow-y-hidden">
            <PoolFilter 
                options={options}
                selected={selected} 
                onSelect={handleSelect}
            />
            <PoolDisplay 
                appointments={filteredAppointments} 
            />
        </div>
    );
}