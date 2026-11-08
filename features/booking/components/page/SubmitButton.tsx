'use client';

type ContinueButtonType = {
    disabled?: boolean;
    onBack: () =>  void;
    action: () => void;
}

export default function SubmitButton ({ disabled, onBack, action }: ContinueButtonType) {
    return (
        <span className="spaced gap-x-4 w-full">
            
            <button
                disabled={disabled}
                onClick={action}
                className="normal-space bg-primary flex-1 w-full hover:bg-primary-hover text-center  text-deep hover:cursor-pointer ml-auto" 
            >
                Crear Cita
            </button>
        </span>
    );
}