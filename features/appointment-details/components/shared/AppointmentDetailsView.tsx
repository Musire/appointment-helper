
import { AppointmentDetails } from "@/domains/appointments/appointment.types";
import { Role, viewConfig } from "../../actionConfig";


type Props = {
    appointment: AppointmentDetails;
    role: Role;
};

export default function AppointmentDetailsView({
    appointment,
    role,
}: Props) {
    const config = viewConfig[role][appointment.status];

    if (!config) return null;

    const { Component, actions } = config;

    return (
        <Component
            appointment={appointment}
            actions={actions}
        />
    );
}