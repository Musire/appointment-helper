'use client';

type ContinueButtonType = {
    disabled?: boolean;
    action: () => void;
}

export default function SubmitButton ({ disabled, action }: ContinueButtonType) {

    return (
        <button
            disabled={disabled}
            onClick={action}
            className="btn absolute bottom-6 text-center left-1/2 -translate-x-1/2 w-3/4" 
        >
            Submit
        </button>
    );
}