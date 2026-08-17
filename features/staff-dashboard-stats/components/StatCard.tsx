import { Body, Caption } from "@/components/ui";
import { CheckCircle, Hourglass, LucideProps, MapPinCheck } from "lucide-react";
import { ComponentType } from "react";

type StatConfig = {
    label: string;
    style: string;
    Icon: ComponentType<LucideProps>;
}

const StatCardConfig: Record<string, StatConfig> = {
    pendiente: {
        label: 'Pendiente',
        style: "text-else",
        Icon: Hourglass
    },
    checkin: {
        label: 'Check-In',
        style: "text-blue-500 dark:text-blue-300",
        Icon: MapPinCheck
    },
    finalizado: {
        label: 'Finalizado',
        style: "text-success",
        Icon: CheckCircle
    }
}

type Props = {
  variant: string
  value: number
}

export default function StatCard ({
    variant,
    value
}: Props) {

    const { label, style, Icon } = StatCardConfig[variant]

    return (
        <li className="bg-surface-1 w-full rounded-md h-full shrink-0 centered-col space-y-2 ">
          <Body className="text-fluid-4xl">{value}</Body>
          <Body className={`flex items-center space-x-2 ${style}`}>
            <Icon strokeWidth={1} />
            <Caption className="text-fluid-lg">{label}</Caption>
          </Body>
        </li>
    );
}