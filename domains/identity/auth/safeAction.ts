import { formatActionError } from "@/lib/utils/formatError";
import { ActionResult } from "../types";


export async function safeAction<T>(
  handler: () => T | Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await handler();
    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    // Uses your helper to consistently format and return the error state
    return formatActionError(error);
  }
}