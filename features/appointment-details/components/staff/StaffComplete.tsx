'use client';

import { BottomDrawer, DrawerContent, DrawerTrigger } from "@/components/ui";
import { AppointmentDetails } from "@/domains/appointments/appointment.types";
import DetailSection from "@/domains/appointments/components/details/DetailSection";
import { ServiceSlot, StoreSlot } from "@/features/booking/components";
import DatetimeSlot from "@/features/booking/components/slots/DatetimeSlot";
import { formatDateTime } from "@/lib/utils/timeConversion";
import { EllipsisVertical } from "lucide-react";
import AppointmentHeader from "../shared/AppointmentHeader";

type Props = {
  appointment: AppointmentDetails
}


export default function StaffComplete ({ appointment }: Props) {
    const actions = [
        {
            name: 'test',
            Component: () => null
        }
    ]
    return (
        <div className="flex-1 p-6 stacked">
            <AppointmentHeader status={appointment.status} clientName={appointment.client.fullName} />
            <DetailSection className="">
                <StoreSlot store={appointment.store} />
                <ServiceSlot services={appointment.services} />
                <DatetimeSlot 
                    date={appointment.date.toISOString()} 
                    time={appointment.startTime} 
                />
            </DetailSection>
            <div className="p-6 rounded-lg bg-surface-1">
                <p className="w-full spaced">
                    <span className="text-sm text-else">Completed</span>
                    <span className="">
                        {appointment.completedAt && formatDateTime(appointment.completedAt)}</span>
                </p>
            </div>
            <BottomDrawer>
                <DrawerTrigger>
                    <button
                        type="button"
                        className="surface-1 hover:bg-surface-2 flex size-10 items-center justify-center rounded-full transition-colors absolute right-4 top-4 hover:cursor-pointer"
                    >
                        <EllipsisVertical className="size-5" />
                    </button>
                </DrawerTrigger>
                <DrawerContent>
                    {actions?.map(action => {
                        const {name, Component} = action
                        return <Component key={`appointment-action-${name}`} />
                    })}
                </DrawerContent>
            </BottomDrawer>
        </div>
    );
}