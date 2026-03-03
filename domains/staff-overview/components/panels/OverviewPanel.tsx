import { StoreStatus } from "@/generated/prisma";
import { ProgressBar, StoreStatusBadge } from "../overview";
import RequirementBadge, { RequirementsType } from "../overview/RequirementBadge";


type Props = {
    requirements: any;
    status: StoreStatus
}


// instruction

// status bar indicator with label and %


const requirementMeta = {
  hasConfig: "Configuration",
  hasServices: "Services",
  hasActiveStaff: "Active Staff",
} as const;



export default function OverviewPanel ({ requirements, status }: Props) {
    return (
        <article className="flex flex-col space-y-4 p-6 card">
            <StoreStatusBadge status={status} />
            <p className="text-sm text-else">Complete setup to activate store </p>
            <ProgressBar label="Store Setup Progress" {...{requirements}} />
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