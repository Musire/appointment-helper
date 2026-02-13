import { BookingContextType } from "../orchestrator";
import { ContinueButton, Header, Indicator } from "../page";

type ReviewStepProps = {
    value: BookingContextType;
    onBack: () => void;
    onSubmit: (value: BookingContextType) => void;
    steps: string[];
}

export default function ReviewStep ({ value, onBack, onSubmit, steps }: ReviewStepProps) {
     const handleContinue = () => {
        onSubmit(value)
    }

    return (
        <div className="w-full flex flex-col space-y-6">
            <Header {...{onBack}} title="Review and Confirm" />
            <Indicator {...{steps}} index={5} />
            
            <ContinueButton onContinue={handleContinue} />
        </div>
    );
}