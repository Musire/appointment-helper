'use client';

import { ProgressBar } from "@/domains/admin-dashboard";
import RequirementBadge, { RequirementsType } from "@/domains/admin-dashboard/overview/components/overview/RequirementBadge";
import { StaffStatusBadge } from "@/domains/staff-dashboard";
import { extractPercentage } from "@/lib/numberMutate";

type Props = {
    requirements: {
        hours: boolean
    }
}

type HoursType = {
    hours: boolean;
}

const requirementMeta = {
  hours: "Availability Hours",
} as const;


export default function ProfileCreation ({ requirements }: Props) {

    const { counted, totalCount, percentage } = extractPercentage(requirements)

    return (
        <>
            <article className="flex flex-col space-y-4 p-6 card">
                <StaffStatusBadge active={requirements.hours} />
                <p className="text-sm text-else">Complete setup to activate store </p>
                <ProgressBar 
                    label="Store Setup Progress"
                    {...{counted}}
                    {...{totalCount}}
                    {...{percentage}}
                />
                <h3 className="text-main">Required to Activate</h3>
                <ul className="flex flex-col capitalize">
                    {Object.entries(requirementMeta).map(([key, label]) => {
                    const value = requirements[key as keyof HoursType];
    
                    return (
                        <RequirementBadge key={key} {...{value}} {...{label}} />
                    )
                    })}
                </ul>
            </article>
        </>
    );
}