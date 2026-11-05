import { Body, Caption } from "@/components/ui";
import { CheckCircle, Hourglass, LucideProps, MapPinCheck } from "lucide-react";
import { ComponentType } from "react";

type StatConfig = {
    label: string;
    Icon: ComponentType<LucideProps>;
}

const StatCardConfig: Record<string, StatConfig> = {
    pendiente: {
        label: 'Pendiente',
        Icon: Hourglass
    },
    checkin: {
        label: 'Check-In',
        Icon: MapPinCheck
    },
    finalizado: {
        label: 'Finalizado',
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

    const { label, Icon } = StatCardConfig[variant]

    return (
        <li className=" w-full rounded-md h-full shrink-0 centered-col space-y-2 ">
          <Body className="text-fluid-4xl">{value}</Body>
          <Body className={`flex items-center space-x-2 text-else`}>
            <Icon strokeWidth={1} className="size-5" />
            <Caption className="text-xs">{label}</Caption>
          </Body>
        </li>
    );
}