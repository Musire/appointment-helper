
export function formatActionError(err: unknown): { success: false; data: null; error: string } {
  let msg = "Unknown error";
  
  if (err instanceof Error) {
    msg = err.message;
  }
  
  // Intercept Prisma connection/constraint errors if applicable
  if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
    msg = "Cannot create duplicates";
  }

  return {
    success: false,
    data: null,
    error: msg
  };
}