"use server"

export type UploadState = {
  success: boolean
  message: string
}

export async function uploadImage(
  prevState: UploadState,
  formData: FormData
): Promise<UploadState> {

  const file = formData.get("image") as File | null

  if (!file) {
    return {
      success: false,
      message: "No file uploaded"
    }
  }

  const MAX_SIZE = 2 * 1024 * 1024
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/webp"
  ]

  if (file.size > MAX_SIZE) {
    return {
      success: false,
      message: "File too large"
    }
  }

  console.log(file)

  if (!allowedTypes.includes(file.type)) {
    return { success: false, message: "Invalid file type" }
  }

  return {
    success: true,
    message: "Image validated successfully"
  }
}