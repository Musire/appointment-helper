import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import { StoreConfig } from "@/generated/prisma";
import { sortByWeekday, Weekday } from "@/lib/stringMutate";


type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

type DayHours = {
  start: string
  end: string
}

type WeeklyHours = Record<DayKey, DayHours>

type ConfigTableProps = {
    config: StoreConfig | null
}

export default function ConfigTable ({ config }: ConfigTableProps) {
    if (!config) return null;

    const hours = config.hours as WeeklyHours | undefined
    
    const rows = hours
        ? (Object.entries(hours) as [Weekday, WeeklyHours[Weekday]][])
            .map(([day, { start, end }]) => ({
              day,
              start,
              end,
            }))
        : []
        
    return (
        <Table className="max-w-44 border border-whitesmoke/37">
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
    );
}