'use client';

import { ExtendedUserAppointment } from "@/domains/appointments/appointment.types";
import usePoolFilters from "../usePoolFilters";
import FilterComponent from "./FilterComponent";
import PoolDisplay from "./PoolDisplay";

export type OptionType = 'all' |
    'checkedin' |
    'pending' |
    'cancelled' |
    'noshow' | 
    'inprogress' |
    'completed'


type Props = {
    appointments: ExtendedUserAppointment[]
}

export default function PoolPage ({ 
    appointments 
}: Props) {

    const {
        options,
        selected,
        selectedDate,
        handleSelect,
        handleDateSelect,
        filteredAppointments,
        loading
    } = usePoolFilters({ appointments })
    

    return (
        <div className="flex-1 grid grid-cols-1 grid-rows-[5rem_1fr] overflow-y-hidden">
            <FilterComponent 
                options={options}
                selected={selected}
                selectedDate={selectedDate}
                handleSelect={handleSelect}
                handleDateSelect={handleDateSelect}
            />
            <PoolDisplay 
                appointments={filteredAppointments}
                loading={loading}
            />
        </div>
    );
}