import { StoreStatus } from "@/generated/prisma";
import { CheckCircle, TriangleAlert, X } from "lucide-react";

type Props = {
    status: StoreStatus
}

const variantIcons = {
    'DRAFT': () => <TriangleAlert />,
    'ACTIVE': () => <CheckCircle className="text-success-dark" />,
    'SUSPENDED': () => <X />
}

export default function StoreStatusBadge ({ status }: Props) {
    const Icon = variantIcons[status]
    return (
        <span className="flex space-x-2 items-center">
            <Icon />
            <p className="capitalize">{status.toLowerCase()}</p>
        </span>
    );
}