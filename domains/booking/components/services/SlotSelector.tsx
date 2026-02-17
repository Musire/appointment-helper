'use client';

type SlotType = {
    id: string;
    time: string;
}

type SlotProps = {
    data: SlotType;
    selected: boolean;
    onSelect: () => void;
}

function Slot ({ data, selected, onSelect }: SlotProps) {
    const isSelected = selected
        ? "bg-dark ring-whitesmoke/20"
        : "bg-darkest ring-transparent"


    return (
        <li onClick={onSelect} className={`ring-2 centered normal-space hover:cursor-pointer ${isSelected}`}>
            {data.time}
        </li>
    );
}



type SlotSelectorProps = {
    slots: SlotType[];
    selectedTime: string;
    onSelect: (s: string) => void;
}

export default function SlotSelector ({ slots, selectedTime, onSelect }: SlotSelectorProps) {

    return (
        <>
            <ul className="grid grid-cols-3 place-content-center gap-6">
                {slots.map(s => (
                    <Slot 
                        key={s.time} 
                        data={s}
                        selected={selectedTime === s.time}
                        onSelect={() => onSelect(s.time)}
                    />
                ))}    
            </ul>
        </>
    );
}