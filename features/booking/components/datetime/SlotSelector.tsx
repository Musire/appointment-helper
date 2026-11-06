'use client';

import { toMeridiem } from "@/lib/utils/timeConversion";



type SlotProps = {
    data: number;
    selected: boolean;
    onSelect: () => void;
}

function Slot ({ data, selected, onSelect }: SlotProps) {
    const isSelected = selected
        ? "bg-primary text-deep font-semibold ring-whitesmoke/20"
        : "bg-darkest ring-transparent hover:bg-darker"


    return (
        <li onClick={onSelect} className={`ring-2 centered normal-space hover:cursor-pointer ${isSelected}`}>
            {toMeridiem(data*60)}
        </li>
    );
}



type SlotSelectorProps = {
    slots: number[];
    selectedTime: number;
    onSelect: (s: number) => void;
}

export default function SlotSelector ({ slots, selectedTime, onSelect }: SlotSelectorProps) {

    return (
        <>
            <ul className="grid grid-cols-3 place-content-center gap-6">
                {slots.map(s => (
                    <Slot 
                        key={s} 
                        data={s}
                        selected={selectedTime === s}
                        onSelect={() => onSelect(s)}
                    />
                ))}    
            </ul>
        </>
    );
}