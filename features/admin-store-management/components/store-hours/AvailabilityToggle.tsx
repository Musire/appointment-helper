"use client"

import { Switch } from "@/components/ui/switch"

interface Props {
  isAvailable: boolean
  onToggle: (checked: boolean) => void
}

export default function AvailabilityToggle({ 
    isAvailable, 
    onToggle 
}: Props) {
  return (
    <Switch
      checked={isAvailable}
      onCheckedChange={onToggle}
      aria-label="Toggle availability"
    />
  )
}
