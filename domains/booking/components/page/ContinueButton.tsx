'use client';

import { BookingParams, buildQuery } from "@/lib/helpers/navigation";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type ContinueButtonType = {
    next: string;
    selected: string | undefined
}

export default function ContinueButton ({ next, selected }: ContinueButtonType) {
    const searchParams = useSearchParams()
    const params = Object.fromEntries(searchParams.entries())

    const pathname = usePathname()
    const segment = pathname.split("/").filter(Boolean).pop()
    const current = (segment === "booking") ? "store" : segment
    const nextParams = {
        ...params,
        [current!]: selected,
    }

    return (
        <>
            {!selected ? (
                <button 
                    type="button" 
                    disabled 
                    className="btn absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4"
                >
                    Continue
                </button>
            ) : (
                <Link
                    href={buildQuery(next, nextParams)}
                    className="btn absolute bottom-6 text-center left-1/2 -translate-x-1/2 w-3/4" 
                >
                    Continue
                </Link>
            )}
        </>
    );
}