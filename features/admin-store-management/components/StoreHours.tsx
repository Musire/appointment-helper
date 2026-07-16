"use client"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/UI/table"
import { useStore } from "@/context"
import { LoaderCircle } from "lucide-react"
import { useMemo, useState, useTransition } from "react"
import { updateStoreHours } from "../actions/storeHours.action"
import { DataTableRow } from "./store-hours"


interface storeHours {
    id: string;
    label: string;
    start: string;
    end:string;
    isActive: boolean
}

type Props = {
  initialHours: storeHours[]
}

export default function StoreHours({
  initialHours
}: Props) {
  const { storeId } = useStore()
  const [hoursList, setHoursList] = useState(initialHours)
  const [isPending, startTransition] = useTransition()

  const handleRowChange = (id: string, key: "isActive" | "start" | "end", value: any) => {
    setHoursList((prevList) =>
      prevList.map((row) =>
        row.id === id ? { ...row, [key]: value } : row
      )
    )
  }

  const hasChanges = useMemo(() => {
    return JSON.stringify(hoursList) !== JSON.stringify(initialHours)
  }, [hoursList, initialHours])

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateStoreHours(storeId, hoursList) 
      if (res?.success && res?.data?.hours) {
        setHoursList(res.data.hours)
      }
    })
  }

  return (
    <div className="mt-10">
      <Table className="stacked divide-none border-none">
        <TableHeader className="">
          <TableRow className="grid grid-cols-[15%_25%_30%_30%] text-lg font-semibold border-b-border content-center">
            <TableHead></TableHead>
            <TableHead className="flex items-center">Dia</TableHead>
            <TableHead className="text-center centered">Comienzo</TableHead>
            <TableHead className="text-center centered">Final</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-none">
          {hoursList.map((row) => (
            <DataTableRow 
              key={row.id} 
              rowData={row} 
              onRowChange={(key, val) => handleRowChange(row.id, key, val)}
            />
          ))}
        </TableBody>
      </Table>

      {hasChanges && (
        <div className="flex justify-end space-x-2 mt-6">
        
          <button 
            onClick={() => setHoursList(initialHours)}
            className="cursor-pointer normal-space bg-surface-1 hover:bg-background active:opacity-90 hover:opacity-80"  
          >
            Cancelar
          </button>
        <button 
          type="button" 
          onClick={handleSave} 
          disabled={!hasChanges}
          className={"cursor-pointer bg-success/30 text-success normal-space hover:opacity-80 active:opacity-90 w-24 centered font-semibold border border-success/50"}
        >
          {isPending ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <p className="">Guardar</p>
          )}
        </button>
      </div>)}
    </div>
  )
}
