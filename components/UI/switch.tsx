"use client"

import { cn } from "@/lib/utils"
import { Switch as SwitchPrimitive } from "radix-ui"
import * as React from "react"

type Props = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}

export default function Switch({
  className,
  size = "default",
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: Props) {
  const isControlled = checked !== undefined

  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked ?? false
  )

  const currentChecked = isControlled ? checked : internalChecked

  function handleChange(value: boolean) {
    if (!isControlled) {
      setInternalChecked(value)
    }

    onCheckedChange?.(value)
  }

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      checked={currentChecked}
      onCheckedChange={handleChange}
      className={cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-success-dark data-[state=unchecked]:bg-dark dark:data-[state=unchecked]:bg-input/80 hover:cursor-pointer",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-silver data-[state=checked]:bg-deep ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  )
}