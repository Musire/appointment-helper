'use client';
import { editStoreConfig } from "@/app/actions/store.actions";
import { useStore } from "@/stores";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table"
import { sortByWeekday, Weekday } from "@/lib/stringMutate";


type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

type DayHours = {
  start: string
  end: string
}

type WeeklyHours = Record<DayKey, DayHours>

export default function ConfigPage () {
    const { config } = useStore()
    const router = useRouter()

    const updateConfig = async () => {
      const { success, error } = await editStoreConfig(store.id)

      if (!success) {
        console.error(error)
        return ;
      }

      router.refresh()
    }

    const hours = config?.hours as WeeklyHours | undefined

    const rows = hours
        ? (Object.entries(hours) as [Weekday, WeeklyHours[Weekday]][])
            .map(([day, { start, end }]) => ({
              day,
              start,
              end,
            }))
        : []
    

    return (
      <div className="py-6 flex flex-col ">
          <button onClick={updateConfig} type="button" className="btn self-end">Edit Hours</button>
          <Table className="max-w-44">
            <TableCaption>Current Business Hours</TableCaption>
            <TableHeader >
              <TableRow className="flex justify-center items-center text-smokewhite/87" >
                <TableHead className="w-24 centered">Weekday</TableHead>
                <TableHead className="w-24 centered">Start</TableHead>
                <TableHead className="w-24 centered ">End</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortByWeekday(rows).map(r => (
                <TableRow key={`weekly-hours-${r.day}`} className="flex justify-center items-center text-whitesmoke/60 hover:text-alternate active:text-alternate">
                  <TableCell className="w-24 capitalize centered ">{r.day}</TableCell>
                  <TableCell className="w-24 centered ">{r.start}</TableCell>
                  <TableCell className="w-24 centered ">{r.end}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </div>
    );
}

