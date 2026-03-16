// components/UI/StatusButton.tsx
import { UploadState } from "@/domains/image-validation/actions/image-uploading.actions"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility to merge tailwind classes safely
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type StatusButtonProps = {
  isPending: boolean;
  state: UploadState;
  className?: string;
  idleText?: string;
}

export default function StatusButton({
  isPending,
  state,
  className,
  idleText = "Save"
}: StatusButtonProps) {
  
  // 1. Determine current status
  const isSuccess = state.success
  const isError = !state.success && state.message !== ""

  return (
    <button
      type="submit"
      disabled={isPending || isSuccess}
      className={cn(
        // Base styles
        "px-3 py-2",
        // Conditional colors
        {
          "bg-success-dark text-deep disabled:hover:cursor-not-allowed hover:bg-success-dark": isSuccess,
          "bg-error-dark text-deep hover:opacity-80 hover:bg-error-dark": isError,
          "opacity-70": isPending,
        },
        className
      )}
    >
      {isPending ? (
        "Loading..."
      ) : isSuccess ? (
        "Success!"
      ) : isError ? (
        "Try Again"
      ) : (
        idleText
      )}
    </button>
  )
}
