import { StaffDatetimeRepository } from "../respositories/StaffDatetimeRepository";


export async function getDatetimeService (storeId: string, staffId: string, targetDate: Date): Promise<{ id: string; time: string; }[]> { 
  const availability = await StaffDatetimeRepository.getAvailability(storeId, staffId, targetDate) ?? []; 
  const blocked = await StaffDatetimeRepository.getBlocked(staffId, targetDate) ?? [];
  const booked = await StaffDatetimeRepository.getBooked(staffId, targetDate) ?? [];
  
  const unavailable = new Set([...blocked, ...booked]);
  
  return availability
    .filter(slot => !unavailable.has(slot))
    .map(slot => ({ id: crypto.randomUUID(), time: slot })); 
}