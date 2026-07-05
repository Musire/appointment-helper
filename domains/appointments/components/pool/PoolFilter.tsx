'use client';

import { FilterChip } from ".";
import { OptionType } from "./PoolPage";

type Props = {
    options: OptionType[];
    selected: string[];
    onSelect: (value: string) => void;
}

export default function PoolFilter ({
    options,
    selected,
    onSelect
}: Props) {
    
    
    return (
        <ul className="flex items-center space-x-2 h-20 w-full overflow-x-auto scrollbar-none">
            {options.map((o, index) => {
                return (
                    <FilterChip 
                        key={`${o}-${index}`}
                        value={o}
                        isActive={selected.includes(o)}
                        onSelect={() => onSelect(o)}
                    />
                )
            })}
        </ul>
    );
}