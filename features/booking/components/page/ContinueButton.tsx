'use client';

import { buildQuery } from "@/lib/utils/navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ContinueButtonType = {
    onBack: () => void;
    next: string;
    selected: string | undefined
}

export default function ContinueButton ({ onBack, next, selected }: ContinueButtonType) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = Object.fromEntries(searchParams.entries())

    const pathname = usePathname()
    const segment = pathname.split("/").filter(Boolean).pop()
    const current = (segment === "booking") ? "store" : segment
    const nextParams = {
        ...params,
        [current!]: selected,
    }

    const handleContinue = () => {
        const destinationUrl = buildQuery(next, nextParams); 
        router.push(destinationUrl); 
    };

    return (
        <span className="flex items-center gap-x-4 mt-auto">
            <button
                type="button"
                disabled={!selected}
                onClick={handleContinue}
                className={`normal-space flex-1 max-w-60 text-center ml-auto ${
                    !selected 
                        ? "btn" 
                        : "bg-primary hover:bg-primary-hover hover:cursor-pointer text-deep cursor-pointer "
                }`}
            >
                Continue
            </button>
        </span>
    );
}