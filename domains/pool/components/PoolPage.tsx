'use client';

import { DatePickerButton } from "@/components/ui/date-picker";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { AppointmentDetails } from "../../appointments/appointment.types";
import PoolDisplay from "./PoolDisplay";
import PoolFilter from "./PoolFilter";
import usePoolFilters from "../usePoolFilters";
import FilterComponent from "./FilterComponent";

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

    const {
        options,
        selected,
        selectedDate,
        handleSelect,
        handleDateSelect,
        filteredAppointments,
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
            />
        </div>
    );
}