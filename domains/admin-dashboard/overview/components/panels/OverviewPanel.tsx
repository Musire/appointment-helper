import { StoreStatus } from "@/generated/prisma";
import { extractPercentage } from "@/lib/numberMutate";
import { ProgressBar, StoreStatusBadge } from "../overview";
import RequirementBadge, { RequirementsType } from "../overview/RequirementBadge";

type Props = {
    requirements: any;
    status: StoreStatus
}

const requirementMeta = {
  hasConfig: "Configuration",
  hasServices: "Services",
  hasActiveStaff: "Active Staff",
} as const;


export default function OverviewPanel ({ requirements, status }: Props) {

    const { counted, totalCount, percentage } = extractPercentage(requirements)
    

    return (
        <article className="flex flex-col space-y-4 p-6 card">
            <StoreStatusBadge status={status} />
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
                const value = requirements[key as keyof RequirementsType];

                return (
                  <RequirementBadge key={key} {...{value}} {...{label}} />
                )
              })}
            </ul>
        </article>
    );
}