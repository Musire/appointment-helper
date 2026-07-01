import { calculatePercentage } from "@/lib/numberMutate";
import { RequirementsType } from "./RequirementBadge";

type Props= {
    label: string;
    counted: number;
    totalCount: number;
    percentage: number;
}


export default function ProgressBar({ label, counted, totalCount, percentage }: Props) {
    

    return (
        <div className="relative h-10">
            <span className="spaced text-main">
                <p className="text-sm">{label}</p>
                <p className="">{`${percentage}%`}</p>
            </span>
            <div className="absolute bottom-0 left-0 h-2 z-0 w-full bg-dark" />
            <div 
                className="absolute bottom-0 left-0 h-2 z-10 bg-success-dark"
                style={{ width: `${percentage}%` }} 
            />
        </div>
    );
}