import React from "react";
import { CancelAppointmentButton, CheckinButton, MarkNoshowButton, PendingDetails } from "../components/details";
import { PendingDetailsProps } from "../components/details/PendingDetails";

export type AppointmentStatus =
  | "pending"
  | "checkedin"
  | "inprogress"
  | "completed"
  | "cancelled"
  | "noshow";

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
    pending: {
        actions: [
            { name: 'checkin-button', Component: CheckinButton},
            { name: 'noshow-button', Component: MarkNoshowButton},
            { name: 'cancellation-button', Component: CancelAppointmentButton}
        ],
        Component: PendingDetails
    },

    checkedin: {
        actions: [{ name: 'cancellation-button', Component: CancelAppointmentButton}],
        Component: PendingDetails
    },

    inprogress: {
        actions: [{ name: 'cancellation-button', Component: CancelAppointmentButton}],
        Component: PendingDetails
    },

    completed: {
        actions: [],
        Component: PendingDetails
    },

    cancelled: {
        actions: [],
        Component: PendingDetails
    },

    noshow: {
        actions: [],
        Component: PendingDetails
    },
}