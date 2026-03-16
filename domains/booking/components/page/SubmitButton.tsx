'use client';

type ContinueButtonType = {
    disabled?: boolean;
    onBack: () =>  void;
    action: () => void;
}

export default function SubmitButton ({ disabled, onBack, action }: ContinueButtonType) {
    return (
        <span className="spaced w-[calc(100%-3rem)] absolute gap-x-4 bottom-6  left-1/2 -translate-x-1/2">
            <button type="button" onClick={onBack} className="btn flex-1">Back</button>
            <button
                disabled={disabled}
                onClick={action}
                className="normal-space bg-primary flex-1 hover:bg-primary-hover text-center text-deep" 
            >
                Submit
            </button>
        </span>
    );
}