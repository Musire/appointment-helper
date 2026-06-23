'use client';

import { buildQuery } from "@/lib/helpers/navigation";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type ContinueButtonType = {
    onBack: () => void;
    next: string;
    selected: string | undefined
}

export default function ContinueButton ({ onBack, next, selected }: ContinueButtonType) {
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
        <span className="spaced  gap-x-4 mt-auto">
            <button type="button" onClick={onBack} className="btn flex-1 max-w-60">Back</button>
            {!selected ? (
                <button 
                    type="button" 
                    disabled 
                    className="btn max-w-60 normal-space flex-1"
                >
                    Continue
                </button>
            ) : (
                <Link
                    href={buildQuery(next, nextParams)}
                    className="normal-space bg-primary flex-1 max-w-60 hover:bg-primary-hover text-center  text-deep " 
                >
                    Continue
                </Link>
            )}
        </span>
    );
}