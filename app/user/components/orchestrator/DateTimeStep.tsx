'use client';

type DateTimeStepProps = {
    onBack: () => void;
}

export default function DateTimeStep ({ onBack }: DateTimeStepProps) {
    return (
        <div className="">
            <button
                onClick={onBack}
                className="btn absolute bottom-20 left-6"
            >
                back
            </button>
        </div>
    );
}