'use server'

type ResponseState = { success: boolean }

export async function updateBusinessHours(
  prevState: ResponseState | null,
  formData: FormData
): Promise<ResponseState> {
  try {
    const raw = formData.get("hours")
    const parsed = raw ? JSON.parse(raw.toString()) : []


    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Received:", parsed)

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}