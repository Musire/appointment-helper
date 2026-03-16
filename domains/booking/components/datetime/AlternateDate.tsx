'use client'

import {
    Calendar,
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/UI";
import dayjs, { Dayjs } from "dayjs";
import { Calendar as Icon } from "lucide-react";

type AlternateDateProps = {
    selected: Dayjs;
    onSelect: (d: Dayjs) => void;
}

export default function AlternateDate ({ selected, onSelect }: AlternateDateProps) {
    return (
        <div className="w-full h-12 spaced space-x-6  items-center">
            <span className="flex space-x-4 items-center h-full">
                <Icon />
                <p className="">{selected.format('dddd, MMMM D, YYYY')}</p>
            </span>
            <Popover>
                <PopoverTrigger asChild>
                    <button type="button" className="btn">change</button>
                </PopoverTrigger>
                <PopoverContent
                    align="center"
                    side="bottom"
                    avoidCollisions={false}
                    className="fixed left-0 top-1/2 -translate-x-[125%] -translate-y-1/2 w-auto p-0"
                >
                    <Calendar 
                        mode="single" 
                        selected={selected.toDate()} 
                        onSelect={(date) => {
                            if (!date) return
                            onSelect(dayjs(date))
                        }} 
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}