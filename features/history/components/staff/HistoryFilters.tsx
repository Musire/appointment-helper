'use client';

import { SearchBar } from "@/components/ui";
import { DatePickerButton } from "@/components/ui/date-picker";
import { OptionType } from "@/domains/pool/usePoolFilters";
import { Dispatch, SetStateAction } from "react";
import StatusFilter from "./StatusFilter";

type DateRangeValue = {
  from?: string;
  to?: string;
};

type Props = {
  selectedDate: DateRangeValue;
  handleDateSelect: (range: DateRangeValue) => void;
  options: OptionType[];
  selected: OptionType[];
  handleSelect: (value: OptionType) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export default function HistoryFilters ({
    selectedDate,
    handleDateSelect,
    options,
    selected,
    handleSelect,
    searchQuery,
    setSearchQuery
}: Props) {
    return (
        <div className="flex flex-col space-y-2">
            <div className="spaced">
                <DatePickerButton 
                    selectedDate={selectedDate} 
                    onChange={handleDateSelect}
                    mode="range" 
                />
                <StatusFilter 
                    options={options}
                    selected={selected}
                    onSelect={handleSelect}
                />
            </div>
            <SearchBar 
                query={searchQuery} 
                setQuery={setSearchQuery} 
            />
        </div>
    );
}
