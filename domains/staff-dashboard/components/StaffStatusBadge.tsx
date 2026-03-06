import { CheckCircle, TriangleAlert, X } from "lucide-react";

type Props = {
    active: boolean
}

export default function StoreStatusBadge ({ active }: Props) {
    const Icon = active
        ? <CheckCircle className="text-success-dark" />
        : <TriangleAlert />

    const status = active ? "active" : "draft"

    return (
        <span className="flex space-x-2 items-center">
            {Icon}
            <p className="capitalize text-lg">{status}</p>
        </span>
    );
}