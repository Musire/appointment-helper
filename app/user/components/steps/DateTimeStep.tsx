'use client';

import { WeeklySelector } from "@/domains/booking";
import { ContinueButton, Header, Indicator } from "../page";

type DateTimeStepProps = {
    onBack: () => void;
    onChange: (v: string) => void;
    steps: string[];
}

export default function DateTimeStep ({ onBack, onChange, steps }: DateTimeStepProps) {
    const handleContinue = () => {
        onChange('test')
    }
    
    return (
        <div className="w-full flex flex-col space-y-6">
            <Header onBack={onBack} title={'Select Date and Time'} />
            <Indicator {...{steps}} index={4} />
            <WeeklySelector />
            <ContinueButton onContinue={handleContinue} />
        </div>
    )
}