'use client';

import { ContinueButton, Header } from "../page";

type DateTimeStepProps = {
    onBack: () => void;
    onChange: (v: string) => void;
}

export default function DateTimeStep ({ onBack, onChange }: DateTimeStepProps) {
    const handleContinue = () => {
        onChange('test')
    }
    
    return (
        <div className="">
            <Header onBack={onBack} title={'Select Date and Time'} />
            <ContinueButton onContinue={handleContinue} />
        </div>
    )
}