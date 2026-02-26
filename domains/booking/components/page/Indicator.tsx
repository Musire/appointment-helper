import { Check } from "lucide-react";

type StepStatus = "upcoming" | "current" | "completed"

function Dot({ status }: { status: StepStatus }) {
    const styles = {
        upcoming: "bg-darker",
        current: "bg-whitesmoke/37",
        completed: "bg-whitesmoke/87 text-deep",
    };

    return (
        <div className={`rounded-full centered size-6 ${styles[status]}`}>
            {status === "completed" && <Check size={15} />}
        </div>
    );
}

function Line({ status }: { status: StepStatus }) {
    const isComplete = status === "completed";

    return (
        <div
            className={`h-0.5 w-12 ${
            isComplete ? "bg-whitesmoke/37" : "bg-whitesmoke/15"
            }`}
        />
    );
}

function Segment({
    isLast,
    status,
    step,
}: {
    isLast?: boolean;
    status: StepStatus;
    step: string;
}) {
    const textColor =
        status === "completed"
            ? "text-whitesmoke/87"
            : status === "current"
            ? "text-whitesmoke/60"
            : "text-whitesmoke/37";

    return (
        <div className="flex items-center relative">
            <Dot status={status} />
            {!isLast && <Line status={status} />}
            <p
            className={`absolute capitalize top-12 left-0 -translate-x-[35%] w-20 text-center text-xs ${textColor}`}
            >
            {step}
            </p>
        </div>
    );
}

type IndicatorProps = {
    index: number;
}

export default function Indicator({ index }: IndicatorProps) {
  const steps = ['store', 'staff', 'service', 'dateTime', 'confirm']
  const lastStep = steps.length - 1

    return (
        <div className="flex w-full justify-center mb-12 h-16">
            {steps.map((s, i) => {
            let status: StepStatus;

            if (i < index - 1) {
                status = "completed";
            } else if (i === index - 1) {
                status = "current";
            } else {
                status = "upcoming";
            }

            return (
                <Segment
                key={`${s}-${i}`}
                status={status}
                step={s}
                isLast={i === lastStep}
                />
            );
            })}
        </div>
    );
}