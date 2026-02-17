'use client'; 

import { useState } from "react";

type SelectableProps<T> = {
    data: T[]
    getId: (item: T) => string
    onChange: (v: string | null) => void;
    renderItem: (args: {
        item: T
        selected: boolean
        onSelect: () => void
    }) => React.ReactNode
}

export default function SelectableDisplay<T>({ 
    data, 
    getId,
    onChange,
    renderItem
}: SelectableProps<T>) {

    const [selectedId, setSelectedId] = useState<string | null>(null);
    
    const handleUpdate = (v: string | null) => {
        setSelectedId(prev => {
            if (prev === v) return null;
            return v
        })
    }

    const handleContinue = () => {
        onChange(selectedId)
    }

    return (
        <div className="">
            <ul className="flex flex-col space-y-4">
                {data?.map(item => {
                    const id = getId(item)

                    return (
                        renderItem({
                            item,
                            selected: selectedId === id,
                            onSelect: () => handleUpdate(id),
                        })
                    )})}
            </ul>
            <button 
                onClick={handleContinue} 
                className="btn absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4"
            >
                Continue
            </button>
        </div>
    );
}