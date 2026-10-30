import { DatePickerButton } from "@/components/ui/date-picker";
import { OptionType } from "../usePoolFilters";
import PoolFilter from "./PoolFilter";

type Props = {
    selectedDate: string;
    handleDateSelect: (value: string) => void;
    options: OptionType[];
    selected: OptionType[];
    handleSelect: (value: OptionType) => void;
};

export default function FilterComponent ({
    selectedDate,
    handleDateSelect,
    options,
    selected,
    handleSelect
}: Props) {
    return (
        <div className="flex w-full spaced">
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
    );
}