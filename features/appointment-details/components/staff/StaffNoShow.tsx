'use client';

import { AppointmentDetails } from "@/domains/appointments/appointment.types";
import DetailSection from "@/domains/appointments/components/details/DetailSection";
import { ServiceSlot, StoreSlot } from "@/features/booking/components";
import DatetimeSlot from "@/features/booking/components/slots/DatetimeSlot";
import { formatDateTime } from "@/lib/utils/timeConversion";
import AppointmentHeader from "../shared/AppointmentHeader";

type Props = {
  appointment: AppointmentDetails
}

export default function StaffNoshow ({ appointment }: Props) {
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
                    <span className="text-sm text-else">Missed</span>
                    <span className="text-error">
                        {appointment.noshowAt && formatDateTime(appointment.noshowAt)}</span>
                </p>
            </div>
        </div>
    );
}