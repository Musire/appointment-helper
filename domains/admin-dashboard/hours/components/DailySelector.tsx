'use client';

import { Switch } from "@/components/UI";
import { DropdownButton } from "@/components/UI/buttons";
import { labelToMins, minsToLabel } from "@/lib/time";
import { BusinessDay } from "../model/types";

type Props = BusinessDay & {
    onStartChange: (value: number) => void;
    onEndChange: (value: number) => void;
    onToggle: () => void;
}

export default function DailySelector ({ 
    day, 
    start, 
    end, 
    onStartChange, 
    onEndChange,
    onToggle }: Props) {

    const isOpen = start !== null && end !== null;
  
    return (
        <div className="flex items-center justify-between">
            <p className={`capitalize w-24 ${isOpen ? 'text-main' : 'text-else'}`}>{day}</p>
            {isOpen && (
                <span className="flex items-center space-x-1">
                    <DropdownButton 
                        value={minsToLabel(start)}
                        options={['10:00 AM']}
                        onChange={(v: string) => {
                            onStartChange(labelToMins(v))
                        }}
                        buttonStyle="rounded-none py-1 border-whitesmoke/20 w-22"
                        drawerStyle="w-22 rounded-none bg-darkest"
                    />
                    <p className="text-else">to</p>
                    <DropdownButton 
                        value={minsToLabel(end)}
                        options={['06:00 PM']}
                        onChange={(v: string) => {
                            onEndChange(labelToMins(v))
                        }}
                        buttonStyle="rounded-none py-1 border-whitesmoke/20 w-22"
                        drawerStyle="w-22 rounded-none bg-darkest"
                    />
                </span>
            )}
            {!isOpen && (
                <p className="text-else h-7">Closed</p>
            )}
            <Switch  
                checked={isOpen}
                onCheckedChange={onToggle}
            />
        </div>
    );
}