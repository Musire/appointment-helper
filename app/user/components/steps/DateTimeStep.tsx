'use client';

import { ArrowLeft } from "lucide-react";

type DateTimeStepProps = {
    onBack: () => void;
}

export default function DateTimeStep ({ onBack }: DateTimeStepProps) {
    return (
        <div className="">
            <button
                onClick={onBack}
                className="hover:cursor-pointer"
            >
                <ArrowLeft />
            </button>
            <button className="btn absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 ">Continue</button>
        </div>
    );
}