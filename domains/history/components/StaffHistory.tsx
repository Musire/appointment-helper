'use client';

import { AppointmentHistoryItem } from "@/domains/appointments/appointment.types";
import HistoryFilters from "@/features/history/components/staff/HistoryFilters";
import PaginationDisplay from "@/features/history/components/staff/PaginationDisplay";
import useHistoryFilters, { ItemWithFilters } from "@/features/history/hooks/useHistoryFilters";

type Props = {
  appointments: AppointmentHistoryItem[];
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
                renderItem={(appointment: ItemWithFilters) => (
                    <div key={appointment.id} className="p-4 border rounded-lg border-border spaced cursor-pointer">
                        <p className="font-medium">{appointment.clientName}</p>
                        <p className="text-xs text-muted-foreground">{appointment.status}</p>
                    </div>
                )}    
            />
        </div>
    );
}
