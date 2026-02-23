import { Check } from "lucide-react";



function Dot ({ completed }: { completed: boolean }) {
    const isComplete = completed
        ? 'bg-whitesmoke/87 text-deep'
        : 'bg-darker'

    return (
        <div className={`rounded-full centered size-6 ${isComplete}`} >
            {completed && <Check size={15} />}
        </div>
    )
}

function Line ({ completed }: { completed: boolean }) {
    const isComplete = completed
        ? "bg-whitesmoke/37"
        : "bg-whitesmoke/15"

    return (
        <div className={`h-0.5 w-12 ${isComplete}`} />
    )
}

function Segment ({ 
    isLast,
    completed,
    step
}: { 
    isLast?: boolean;
    completed: boolean;
    step: string;
}) {
    return (
        <div className="flex items-center relative" >
            <Dot {...{completed}} />
            {!isLast && <Line {...{completed}} />}
            <p className={`absolute capitalize top-12 left-0 -translate-x-[35%] w-20 text-center text-xs  ${completed ? "text-whitesmoke/87" : "text-whitesmoke/37"}`}>{step}</p>
        </div>
    )
}

type IndicatorProps = {
    steps: string[];
    index: number;
}

export default function Indicator ({ steps, index }: IndicatorProps) {
    const lastStep = (steps.length - 1)
    return (
        <div className="flex w-full justify-center mb-12 h-16 ">
            {steps.map((s, i) => {
                return (
                    <Segment 
                        key={`${s}-${i}`}
                        completed={i < (index - 1)}
                        step={s}
                        isLast={i === lastStep}  
                    />
                )
            })}
        </div>
    );
}