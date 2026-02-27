"use server"

import { validate, consolidate } from "@/domains/hour-selection/model/validation"

export async function saveBusinessHours(
  prevState: any,
  formData: FormData
) {
  try {
    const raw = formData.get("blocks")

    if (!raw) {
      return { error: "No data submitted" }
    }

    const blocks = JSON.parse(raw as string)

    const result = validate(blocks)

    if (!result.isValid) {
      return { error: result }
    }

    const submission = consolidate(blocks)

    console.log('submission: ', submission)

    return { success: true }

  } catch (e) {
    return { error: "Server error" }
  }
}