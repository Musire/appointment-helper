
import { saveBusinessHoursSchema } from "@/domains/store/store.validations";
import { describe, expect, it } from "vitest";

describe("BH-01: saveBusinessHoursSchema", () => {
  const validBlock = {
    id: "test-id-hoop",
    start: 540, // 09:00 in minutes
    end: 1020,  // 17:00 in minutes
    days: ["mon", "tue", "wed", "thu", "fri"],
  };

  it("accepts a valid 09:00–17:00 time block", () => {
    const result = saveBusinessHoursSchema.safeParse({
      blocks: [validBlock],
    });

    expect(result.success).toBe(true);
  });

  it("rejects a negative start time", () => {
    const result = saveBusinessHoursSchema.safeParse({
      blocks: [{ ...validBlock, start: -1 }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects an end time greater than 86400", () => {
    const result = saveBusinessHoursSchema.safeParse({
      blocks: [{ ...validBlock, end: 86401 }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a non-integer start time", () => {
    const result = saveBusinessHoursSchema.safeParse({
      blocks: [{ ...validBlock, start: 540.5 }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a missing block ID", () => {
    const { id, ...blockWithoutId } = validBlock;

    const result = saveBusinessHoursSchema.safeParse({
      blocks: [blockWithoutId],
    });

    expect(result.success).toBe(false);
  });

  it("accepts an empty blocks array at the schema level", () => {
    const result = saveBusinessHoursSchema.safeParse({
      blocks: [],
    });

    expect(result.success).toBe(true);
  });
});
