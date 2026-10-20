'use client'
import { AppointmentDetails } from "../../appointment.types"
import { APPOINTMENT_STATUS_CONFIG } from "../../utils/PoolDetailsConfig"

type Props = {
  appointment: AppointmentDetails
}

export default function StaffAppointmentDetails({
  appointment
}: Props) {

  const { actions, Component} = APPOINTMENT_STATUS_CONFIG[appointment.status]

  return (
    <Component 
      appointment={appointment} 
      actions={actions} 
    />
  )
}