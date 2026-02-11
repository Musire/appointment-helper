import { ContinueButton, Header } from "../page";

type ReviewStepProps = {
    onBack: () => void;
    onChange: (v: string) => void;
}

export default function ReviewStep ({ onBack, onChange }: ReviewStepProps) {
     const handleContinue = () => {
        onChange('test')
    }

    return (
        <div className="">
            <Header {...{onBack}} title="Review and Confirm" />
            <ContinueButton onContinue={handleContinue} />
        </div>
    );
}