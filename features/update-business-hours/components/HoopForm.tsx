'use client';

import DailySelector from "@/domains/availability/components/DailySelector";
import { businessHours } from "@/features/dashboard/businessHours";
import { hoursReducer } from "@/features/dashboard/hoursReducer";
import { updateBusinessHours } from "@/features/hour-selection/hours.actions";
import { useActionState, useReducer } from "react";

export default function HoopForm () {
    const [state, dispatch] = useReducer(hoursReducer, businessHours);
    const [_, formAction, isPending] = useActionState(updateBusinessHours, null)


    return (
        <form action={formAction} className="card flex flex-col p-6">
            <h2 className="text-main">Business Hours</h2>
            <h3 className="text-sm text-else">Set or modify operating hours</h3>
            <input
                type="hidden"
                name="hours"
                value={JSON.stringify(state)}
            />
            <ul className="flex flex-col space-y-2 my-6">
                {state.map((d) => (
                    <DailySelector
                        key={d.id}
                        id={d.id}
                        day={d.day}
                        start={d.start}
                        end={d.end}
                        onStartChange={(value) =>
                            dispatch({ type: "update_start", id: d.id, value })
                        }
                        onEndChange={(value) =>
                            dispatch({ type: "update_end", id: d.id, value })
                        }
                        onToggle={() =>
                            dispatch({ type: "toggle_closed", id: d.id })
                        }
                    />
                ))}
            </ul>
            <button disabled={isPending} type="submit" className="btn self-end">
                {`${isPending ? "loading.." : "save"}`}
            </button>
        </form>
    );
}