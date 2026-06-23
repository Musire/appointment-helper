// src/domain/appointments/actions/appointment-actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { processAppointmentCheckin } from '../services/appointment-service'

export async function checkInAppointment(appointmentId: string) {
  try {

    await processAppointmentCheckin(appointmentId)
    
    // 3. Perform framework-specific orchestration
    revalidatePath('/appointments') 
    
    return { success: true }
  } catch (error) {
    // Gracefully transform internal domain errors to client-safe messages
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to check in' 
    }
  }
}
