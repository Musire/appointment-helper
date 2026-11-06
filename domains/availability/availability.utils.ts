import { Appointment, DayOfWeek, StaffAvailability } from "@/generated/prisma";
import { Day } from "../offering/offering.types";

export type StaffAvailabilityWithoutId = Omit<StaffAvailability, 'id'>

export type TimeBlock = {
  id: string;
  start: number;   
  end: number;   
  days: Day[]; // Strictly expects types like 'Lu', 'Ma', 'mon', 'sun'
};

interface InputBlock {
  id: string; 
  startTime: number; 
  endTime: number; 
  storeStaffId: string; 
  dayOfWeek: typeof DayOfWeek[keyof typeof DayOfWeek]; 
}

const dayMap: Record<Day, number> = {
  sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
};

const dayOfWeekByIndex: DayOfWeek[] = [
  DayOfWeek.SUNDAY,
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
];

// Helper reverse map to get a valid 'Day' string back from a DayOfWeek enum or index
// Modify the strings ('sun', 'mon' vs 'Do', 'Lu') depending on what your UI expects to render
const indexToDayMap: Record<number, Day> = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

export function convertToTimeBlocks(input: InputBlock[]): TimeBlock[] {
  const grouped = new Map<string, TimeBlock>();

  for (const item of input) {
    const startValue = item.startTime;
    const endValue = item.endTime;

    const groupKey = `${item.storeStaffId}_${startValue}_${endValue}`;
    
    // Convert DayOfWeek enum key string (e.g. "MONDAY") to its index 0-6
    // If your DayOfWeek enum has lowercase keys or needs a direct index mapping, adjust here
    const enumKey = item.dayOfWeek as keyof typeof DayOfWeek;
    const dayIndex = dayOfWeekByIndex.indexOf(DayOfWeek[enumKey]);

    if (dayIndex === -1) continue;

    // Convert the index back to a valid 'Day' type string
    const targetDay = indexToDayMap[dayIndex];
    if (!targetDay) continue;

    const existing = grouped.get(groupKey);

    if (existing) {
      if (!existing.days.includes(targetDay)) {
        existing.days.push(targetDay);
      }
    } else {
      grouped.set(groupKey, {
        id: item.id, 
        start: startValue,
        end: endValue,
        days: [targetDay], // Now accurately matches Day[]
      });
    }
  }

  return Array.from(grouped.values());
}

export function convertToAvailability(
  blocks: TimeBlock[],
  storeStaffId: string,
): StaffAvailabilityWithoutId[] {
  return blocks.flatMap((block) =>
    block.days.map((day) => {
      const dayIndex = dayMap[day];
      
      return {
        storeStaffId,
        startTime: block.start,
        endTime: block.end,
        dayOfWeek: dayOfWeekByIndex[dayIndex] ?? DayOfWeek.MONDAY,
      };
    })
  );
}

export function getDayOfWeek(isoString: string): DayOfWeek {
  const days: DayOfWeek[] = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
  ];
  
  const date = new Date(isoString);
  
  if (isNaN(date.getTime())) {
    throw new Error("Invalid ISO date string provided");
  }
  
  // Use UTC to prevent local timezone shifts from changing the day
  return days[date.getUTCDay()];
}

export function generateTimeGrid(
  startMinutes: number,
  endMinutes: number,
  intervalMinutes: number = 60
): number[] {
  const slots: number[] = [];
  let currentSlot = startMinutes;

  while (currentSlot + intervalMinutes <= endMinutes) {
    slots.push(currentSlot);
    currentSlot += intervalMinutes;
  }

  return slots;
}

export function filterBookedSlots(
  potentialSlots: number[],
  bookedAppointments: Appointment[],
  intervalMinutes: number = 60
): number[] {
  return potentialSlots.filter(slotStart => {
    const slotEnd = slotStart + intervalMinutes;

    // Flip down the slot if any booked appointment overlaps it
    const isBooked = bookedAppointments.some(appointment => {
      return slotStart < appointment.endTime && slotEnd > appointment.startTime;
    });

    return !isBooked;
  });
}