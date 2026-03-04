import { Check, X } from "lucide-react";

export type RequirementsType = {
  hasConfig: boolean;
  hasActiveStaff: boolean;
  hasServices: boolean;
};

interface Props {
  label: string;
  value: boolean
}

const determineIcon = (check: boolean| undefined) => {
    return check 
        ? <Check size={20} className="text-success-dark" /> 
        : <X size={20} className="text-error-dark" />
}

export default function RequirementBadge ({ label, value }: Props) {
    return (
        <li
            className="flex items-center space-x-4"
          >
            {determineIcon(value)}
            <p className="" >{label}</p>
          </li>
    );
}