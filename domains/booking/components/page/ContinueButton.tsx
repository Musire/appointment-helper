'use client';

type ContinueButtonType = {
    isDisabled?: boolean;
    onContinue: () => void;
}

export default function ContinueButton ({ isDisabled, onContinue }: ContinueButtonType) {
    return (
        <button
            disabled={isDisabled}
            onClick={onContinue} 
            className="btn absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4"
        >
            Continue
        </button>
    );
}