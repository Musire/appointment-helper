'use client';

import { Appointment } from "@/generated/prisma";
import { useDrawer } from "@/hooks";
import { MouseEvent } from "react";

type props = {
    data: Appointment
}

export default function AppointmentCard ({ data }: props) {
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
        <li className="">
            <article className="p-6 border-2 border-whitesmoke/30 flex-col flex space-y-6 divide-y-2 divide-dark relative">
                <button 
                    type="button" 
                    onClick={toggleDrawer}
                    className="w-full h-full absolute inset-0 z-0 hover:cursor-pointer" />
                <span className="spaced pb-2 z-10 pointer-events-none">
                    <p className="">{`11:30 AM - Maria`}</p>
                    <p className="">{`Color & Cut`}</p>
                </span>
                {isMounted && (
                    <span className={`w-full z-10 flex pointer-events-auto ${animation ? "animate-ghostIn" : ""}`}>
                        <button 
                            type="button" 
                            onClick={e => handleSuccess(e)} 
                            className="btn grow">
                                Completed
                        </button>
                        <button 
                            type="button"
                            onClick={e => handleNoShow(e)}
                            className="btn grow">
                                No-Show
                        </button>
                        <button 
                            type="button" 
                            onClick={e => handleReschedule(e)}
                            className="btn grow">
                                Reschedule
                        </button>
                    </span>
                )}
            </article>
        </li>
    );
}