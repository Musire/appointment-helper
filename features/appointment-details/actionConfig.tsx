import { AppointmentDetails } from "@/domains/appointments/appointment.types";
import { ComponentType } from "react";

import UserInprogress from "./components/enduser/UserInprogress";
import CancelledButton from "./components/shared/buttons/CancelledButton";
import CheckinButton from "./components/shared/buttons/CheckinButton";
import NoshowButton from "./components/shared/buttons/NoshowButton";
import StartServiceButton from "./components/shared/buttons/StartServiceButton";
import CancelledAppointment from "./components/shared/views/CancelledAppointment";
import CheckinAppointment from "./components/shared/views/CheckinAppointment";
import CompletedAppointment from "./components/shared/views/CompletedAppointment";
import NoshowAppointment from "./components/shared/views/NoshowAppointment";
import PendingAppointment from "./components/shared/views/PendingAppointment";
import StaffInprogress from "./components/staff/StaffInprogress";
import UserPending from "./components/enduser/UserPending";

export type Role = "STAFF" | "USER";

export type AppointmentAction = {
    name: string;
    Component: ComponentType<{ appointmentId: string }>;
};

type ViewConfig = Record<
    Role,
    Partial<
        Record<
            AppointmentDetails["status"],
            {
                Component: ComponentType<{
                    appointment: AppointmentDetails;
                    actions?: AppointmentAction[];
                }>;
                actions?: AppointmentAction[];
            }
        >
    >
>;

export const viewConfig: ViewConfig = {
    STAFF: {
        PENDING: {
            Component: PendingAppointment,
            actions: [
                { name: "checkin", Component: CheckinButton },
                { name: "no-show", Component: NoshowButton },
                { name: "cancel", Component: CancelledButton },
            ],
        },
        CHECKIN: {
            Component: CheckinAppointment,
            actions: [
                { name: "start service", Component: StartServiceButton},
                { name: "cancel", Component: CancelledButton }
            ],
        },
        INPROGRESS: {
            Component: StaffInprogress,
        },
        COMPLETED: {
            Component: CompletedAppointment,
        },
        NOSHOW: {
            Component: NoshowAppointment,
        },
        CANCELLED: {
            Component: CancelledAppointment,
        },
    },
    USER: {
        PENDING: {
            Component: UserPending,
            actions: [
                { name: "cancel", Component: CancelledButton },
            ],
        },
        CHECKIN: {
            Component: CheckinAppointment,
        },
        INPROGRESS: {
            Component: UserInprogress,
        },
        COMPLETED: {
            Component: CompletedAppointment,
        },
        NOSHOW: {
            Component: NoshowAppointment,
        },
        CANCELLED: {
            Component: CancelledAppointment,
        },
    },
};