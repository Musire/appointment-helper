'use client';

import AppointmentCard, { ExtendedUserAppointment } from "@/features/history/components/staff/cards/AppointmentCard";
import HistoryFilters from "@/features/history/components/staff/HistoryFilters";
import PaginationDisplay from "@/features/history/components/staff/PaginationDisplay";
import useHistoryFilters from "@/features/history/hooks/useHistoryFilters";

type Props = {
  appointments: ExtendedUserAppointment[];
};

export default function StaffHistory({ appointments }: Props) {
    const {
        options,
        selected,
        selectedDate,
        searchQuery,
        setSearchQuery,
        handleSelect,
        handleDateSelect,
        filteredItems, 
    } = useHistoryFilters({ items: appointments });

    return (
        <div className="stacked p-6 flex flex-1 overflow-hidden">
            <HistoryFilters 
                selectedDate={selectedDate}
                handleDateSelect={handleDateSelect}
                options={options}
                selected={selected}
                handleSelect={handleSelect}
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
            />
            <PaginationDisplay 
                items={filteredItems} 
                renderItem={(appointment: ExtendedUserAppointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />    
                )}    
            />
        </div>
    );
}
