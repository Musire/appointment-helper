
'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ContinueButtonType = {
    onBack: () => void;
    next: string;
    selected: string | string[] | undefined;
};

export default function ContinueButton({
    onBack,
    next,
    selected
}: ContinueButtonType) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Determine which query parameter belongs to this step.
    const segment = pathname.split("/").filter(Boolean).pop();
    const current = segment === "booking" ? "store" : segment!;

    const handleContinue = () => {
        const params = new URLSearchParams(searchParams.toString());

        // Remove previous selection for this step.
        params.delete(current);

        // Add new selection.
        if (Array.isArray(selected)) {
            selected.forEach(value => params.append(current, value));
        } else if (selected) {
            params.set(current, selected);
        }

        const query = params.toString();

        // Navigate to the next booking step.
        router.push(`/booking/${next}${query ? `?${query}` : ""}`);
    };

    const disabled = !selected ||
        (Array.isArray(selected) && selected.length === 0);

    return (
        <span className="flex items-center gap-x-4 mt-auto w-full">
            <button
                type="button"
                disabled={disabled}
                onClick={handleContinue}
                className={`normal-space flex-1 max-w-60 text-center ml-auto ${
                    disabled
                        ? "btn cursor-not-allowed"
                        : "bg-primary hover:bg-primary-hover hover:cursor-pointer text-deep cursor-pointer"
                }`}
            >
                Continue
            </button>
        </span>
    );
}
