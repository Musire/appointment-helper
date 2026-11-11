'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ContinueButtonType = {
    onBack: () => void;
    next: string;
    selected: string | string[] | undefined;
}

export default function ContinueButton({
    onBack,
    next,
    selected
}: ContinueButtonType) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const segment = pathname.split("/").filter(Boolean).pop();
    const current = segment === "booking" ? "store" : segment;

    const handleContinue = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete(current!);

        if (Array.isArray(selected)) {
            selected.forEach(value => params.append(current!, value));
        } else if (selected) {
            params.set(current!, selected);
        }

        router.push(`${next}?${params.toString()}`);
    };

    return (
        <span className="flex items-center gap-x-4 mt-auto w-full">
            <button
                type="button"
                disabled={!selected || selected.length === 0}
                onClick={handleContinue}
                className={`normal-space flex-1 max-w-60 text-center ml-auto ${
                    !selected || !selected.length
                        ? "btn cursor-not-allowed"
                        : "bg-primary hover:bg-primary-hover hover:cursor-pointer text-deep cursor-pointer"
                }`}
            >
                Continue
            </button>
        </span>
    );
}