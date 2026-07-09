'use client';

type ContinueButtonType = {
    disabled?: boolean;
    onBack: () =>  void;
    action: () => void;
}

export default function SubmitButton ({ disabled, onBack, action }: ContinueButtonType) {
    return (
        <span className="spaced gap-x-4">
            
            <button
                disabled={disabled}
                onClick={action}
                className="normal-space bg-primary flex-1 max-w-60 hover:bg-primary-hover text-center  text-deep hover:cursor-pointer ml-auto" 
            >
                Submit
            </button>
        </span>
    );
}