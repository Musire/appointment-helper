'use client'
import { AppointmentDetails as AppointmentDetailsType } from "../../queries/getAppointmentDetails"
import { APPOINTMENT_STATUS_CONFIG } from "../../utils/PoolDetailsConfig"

type Props = {
  appointment: AppointmentDetailsType
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