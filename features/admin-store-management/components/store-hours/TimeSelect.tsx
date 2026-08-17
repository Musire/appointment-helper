"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, ChevronUp } from "lucide-react"
import * as React from "react"

interface TimeSelectProps {
  value: string
  onChange: (time: string) => void
}

export default function TimeSelect({ value, onChange }: TimeSelectProps) {
  const [open, setOpen] = React.useState(false)
  const uniqueId = React.useId() 

  const parseTime = (timeStr: string) => {
    try {
      if (!timeStr) return { hour: 9, period: "AM" }
      const [timePart, period] = timeStr.split(" ")
      const [hourPart] = timePart.split(":")
      return {
        hour: parseInt(hourPart, 10) || 12,
        period: period === "PM" ? "PM" : "AM",
      }
    } catch {
      return { hour: 9, period: "AM" }
    }
  }

  const { hour, period } = parseTime(value)

  const updateParent = (newHour: number, newPeriod: string) => {
    const formattedHour = newHour.toString().padStart(2, "0")
    const formattedString = `${formattedHour}:00 ${newPeriod}`
    onChange(formattedString)
  }

  const handleHourUp = () => {
    let nextHour = hour + 1
    if (nextHour > 12) nextHour = 1
    updateParent(nextHour, period)
  }

  const handleHourDown = () => {
    let nextHour = hour - 1
    if (nextHour < 1) nextHour = 12
    updateParent(nextHour, period)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full h-full ">
        <button
          type="button"
          className={` w-full h-full cursor-pointer justify-start space-x-2 font-normal text-left rounded-md px-3 py-2  transition-all duration-200 outline-none flex items-center border-none
            ${open ? "ring ring-alternate/50 " : ""}
          `}
        >
          <span>{value || "09:00 AM"}</span>
          <ChevronDown className="shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent id={uniqueId} className="w-full p-3 bg-background border rounded-lg mt-4 border-alternate/50 " align="start">
        <div className="flex  spaced">
          {/* Hour Controls */}
          <div className="flex flex-col justify-center select-none items-center  h-24" >
            <button type="button" className="size-7 centered cursor-pointer" onClick={handleHourDown}>
              <ChevronUp className="size-5" />
            </button>
            <p className="text-xl font-semibold w-8 centered flex-1">
              {hour.toString().padStart(2, "0")}
            </p>
            <button type="button" className="size-7 centered hover:cursor-pointer" onClick={handleHourUp}>
              <ChevronDown className="size-5" />
            </button>
          </div>


          {/* AM / PM Selection */}
          <div className="flex flex-col gap-1 spaced-col  h-24">
            <button
              type="button"
              className={`cursor-pointer h-full px-3 text-xs font-semibold rounded transition-colors
                ${period === "AM" ? "bg-surface-1 font-bold text-primary" : "hover:bg-muted"}
              `}
              onClick={() => updateParent(hour, "AM")}
            >
              AM
            </button>
            <button
              type="button"
              className={`cursor-pointer h-full px-3 text-xs font-semibold rounded transition-colors
                ${period === "PM" ? "bg-surface-1 font-bold text-primary" : "hover:bg-muted"}
              `}
              onClick={() => updateParent(hour, "PM")}
            >
              PM
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
