import { AppointmentStatus } from "@/generated/prisma";
import React from "react";
import { CancelAppointmentButton, CheckinButton, MarkNoshowButton, PendingDetails } from "../components/details";
import { PendingDetailsProps } from "../components/details/PendingDetails";


type ActionProps = { 
    appointmentId: string;
}

export type ActionType = {
    name: string;
    Component: React.ComponentType<ActionProps>
}

export const APPOINTMENT_STATUS_CONFIG: Record<
  AppointmentStatus,
  {
    actions: ActionType[];
    Component: React.ComponentType<PendingDetailsProps>
  }
> = {
    PENDING: {
        actions: [
            { name: 'checkin-button', Component: CheckinButton},
            { name: 'noshow-button', Component: MarkNoshowButton},
            { name: 'cancellation-button', Component: CancelAppointmentButton}
        ],
        Component: PendingDetails
    },

    CHECKIN: {
        actions: [{ name: 'cancellation-button', Component: CancelAppointmentButton}],
        Component: PendingDetails
    },

    INPROGRESS: {
        actions: [{ name: 'cancellation-button', Component: CancelAppointmentButton}],
        Component: PendingDetails
    },

    COMPLETED: {
        actions: [],
        Component: PendingDetails
    },

    CANCELLED: {
        actions: [],
        Component: PendingDetails
    },

    NOSHOW: {
        actions: [],
        Component: PendingDetails
    },
}