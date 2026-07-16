"use client"

import { TableCell, TableRow } from "@/components/UI/table"
import AvailabilityToggle from "./AvailabilityToggle"
import TimeSelect from "./TimeSelect"

interface ScheduleItem {
  id: string
  isActive: boolean
  label: string
  start: string 
  end: string   
}

interface UserRowProps {
  rowData: ScheduleItem
  onRowChange: (key: "isActive" | "start" | "end", value: any) => void
}

export default function DataTableRow({ rowData, onRowChange }: UserRowProps) {
  const { isActive, label, start, end } = rowData

  return (
    <TableRow className={`grid grid-cols-[15%_25%_30%_30%] ${!isActive ? " opacity-60 transition-all" : ""}`}>
      <TableCell className="w-20">
        <AvailabilityToggle 
          isAvailable={isActive} 
          onToggle={(checked) => onRowChange("isActive", checked)} 
        />
      </TableCell>

      <TableCell className={`font-medium  ${!isActive ? "text-else" : ""}`}>
        {label}
      </TableCell>

      {!isActive ? (
        <TableCell colSpan={2} className="text-else font-medium italic text-center">
          Cerrado
        </TableCell>
      ) : (
        <>
          <TableCell className="centered">
            <TimeSelect 
              value={start} 
              onChange={(newTime) => onRowChange("start", newTime)} 
            />
          </TableCell>
          <TableCell className="centered">
            <TimeSelect 
              value={end} 
              onChange={(newTime) => onRowChange("end", newTime)} 
            />
          </TableCell>
        </>
      )}
    </TableRow>
  )
}
