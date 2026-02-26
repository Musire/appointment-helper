'use client'

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Calendar
} from "@/components/UI";
import dayjs, { Dayjs } from "dayjs";
import { Calendar as Icon } from "lucide-react";

type AlternateDateProps = {
    selected: Dayjs;
    onSelect: (d: Dayjs) => void;
}

export default function AlternateDate ({ selected, onSelect }: AlternateDateProps) {
    return (
        <div className="w-full  h-12 centered space-x-6 p-2 bg-darkest">
            <span className="flex space-x-4 items-center h-full w-2/3 justify-center">
                <Icon />
                <p className="">{selected.format('dddd, MMMM D, YYYY')}</p>
            </span>
            <Popover>
                <PopoverTrigger asChild>
                    <button type="button" className="btn">change</button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
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