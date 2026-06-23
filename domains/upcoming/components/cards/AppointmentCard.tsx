'use client';

import { Body, BodySm } from "@/components/UI";
import { AppointmentWithRelations } from "@/domains/staff-history/model/types";
import { useDrawer } from "@/hooks";
import { formatTime } from "@/lib/time";
import { Check, ChevronRight, RefreshCw, X } from "lucide-react";
import { MouseEvent } from "react";

type props = {
    data: AppointmentWithRelations
}

export default function AppointmentCard ({ data }: props) {
    const { startTime, client, items } = data

    const serviceNames = items
        .map(item => item.service.name)
        .join(' • ');

    const { toggleDrawer, isMounted, animation } = useDrawer()

    const handleSuccess = (e: MouseEvent) => {
        e.stopPropagation()
        console.log('handled successfully ')
    }

    const handleNoShow = (e: MouseEvent) => {
        e.stopPropagation()
        console.log('handled no-show ')
    }

    const handleReschedule = (e: MouseEvent) => {
        e.stopPropagation()
        console.log('handled reschedule ')
    }


    return (
        <li className="border-border border surface-1 px-4 py-6 h-fit">
            <button
                type="button"
                onClick={toggleDrawer} 
                className="hover:cursor-pointer  w-full flex divide-x divide-border items-center text-main ">
                <span className="flex flex-col px-4">
                    <Body className="text-fluid-lg font-semibold">{formatTime(startTime)}</Body>
                </span>
                <div 
                    className="flex-1 px-4 spaced">
                    <div className="flex flex-col items-start">
                        <Body>{client.fullName}</Body>
                        <BodySm className="text-else">{serviceNames}</BodySm>
                    </div>
                    <ChevronRight className={`snappy ${isMounted ? "rotate-90 " : ""}`} />
                </div>
            </button>
            {isMounted && (
                <div className={`flex flex-col space-y-2 p-4 ${animation ? "animate-ghostIn" : ""}`}>
                    <button 
                        type="button" 
                        className="hover:cursor-pointer flex items-center gap-x-4 text-success opacity-80 hover:opacity-100 snappy"
                        onClick={handleSuccess} 
                    >
                        <Check />
                        <p className="">Completed</p>
                    </button>
                    <button 
                        type="button" 
                        className="hover:cursor-pointer flex items-center gap-x-4 text-error opacity-80 hover:opacity-100 snappy"
                        onClick={handleNoShow}
                    >
                        <X />
                        <p className="">Mark as No-Show</p>
                    </button>
                    <button 
                        type="button" 
                        className="hover:cursor-pointer flex items-center gap-x-4 text-main opacity-80 hover:opacity-100 snappy"
                        onClick={handleReschedule}
                    >
                        <RefreshCw />
                        <p className="">Reschedule Appointment</p>
                    </button>
                </div>
            )}
        </li>
    );
}