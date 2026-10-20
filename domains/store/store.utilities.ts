import { Consolidated, Day, TimeBlock } from "../offering/offering.types";



export function consolidate(
  blocks: TimeBlock[],
): Consolidated {
  const result: Consolidated = {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  };

  for (const block of blocks) {
    for (const day of block.days) {
      result[day].push([block.start, block.end]);
    }
  }

  return result;
}

export function hasOverlap(
  ranges: [number, number][],
): boolean {
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i][1] > sorted[i + 1][0]) {
      return true;
    }
  }

  return false;
}

export function validate(blocks: TimeBlock[]) {
  const blockErrors: Record<string, string[]> = {};
  const dayOverlapErrors: Partial<Record<Day, boolean>> = {};

  // Block-level validation
  for (const block of blocks) {
    const errors: string[] = [];

    if (block.days.length === 0) {
      errors.push('Select at least one day');
    }

    if (
      !Number.isInteger(block.start) ||
      !Number.isInteger(block.end) ||
      block.start < 0 ||
      block.end > 1440 ||
      block.start >= block.end
    ) {
      errors.push('Start and end must be valid times, with start before end');
    }

    if (errors.length) {
      blockErrors[block.id] = errors;
    }
  }

  // Check overlap only if there are no block-level errors
  if (Object.keys(blockErrors).length === 0) {
    const consolidated = consolidate(blocks);

    for (const day of Object.keys(consolidated) as Day[]) {
      const ranges = consolidated[day];

      if (hasOverlap(ranges)) {
        dayOverlapErrors[day] = true;
      }
    }
  }

  return {
    blockErrors,
    dayOverlapErrors,
    isValid:
      Object.keys(blockErrors).length === 0 &&
      Object.keys(dayOverlapErrors).length === 0,
  };
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export function toStoreHours(
  blocks: TimeBlock[],
): any {
  return blocks.map((block: TimeBlock) => {
    return {
        ...block,
        label: 'Business hours',
        start: minutesToTime(block.start),
        end: minutesToTime(block.end)
    }
  })
}




