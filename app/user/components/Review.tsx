'use client'
import { TestContextType } from "./TestOrchestrator";

type ReviewProps = {
    value: TestContextType;
    onBack: () => void;
}

export default function Review ({ value, onBack }: ReviewProps) {
    return (
        <div className="">
            <pre className="">{JSON.stringify(value, null, 2)}</pre>
            <button onClick={onBack} className="btn">back</button>
        </div>
    );
}