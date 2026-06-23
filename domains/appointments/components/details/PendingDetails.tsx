import { Body, BottomDrawer, Caption, DrawerContent, DrawerTrigger, H3 } from "@/components/UI";
import { ChevronLeft, Clock, EllipsisVertical, Scissors, Store } from "lucide-react";
import { ActionType } from "../../helper/PoolDetailsConfig";
import { AppointmentDetails as AppointmentDetailsType } from "../../queries/getAppointmentDetails";
import DetailSection from "./DetailSection";
import dayjs, { formatAppTimeSplit } from "@/lib/dayjs";
import { getServices } from "@/lib/stringMutate";

export type PendingDetailsProps = {
    appointment: AppointmentDetailsType;
    actions: ActionType[]
}

export default function PendingDetails ({
    appointment,
    actions
}: PendingDetailsProps) {

    const { timeString } = formatAppTimeSplit(dayjs(appointment.scheduledAt))
    const services = getServices(appointment.services)

    return (
        <main className=" py-12 flex-1 bg-background stacked overflow-y-auto">
            <section className="w-full spaced ">
                <ChevronLeft className="size-8" />
                <Body className=" p-2 capitalize rounded-md bg-surface-1 w-40 centered ">
                    {appointment.status}
                </Body>
                <BottomDrawer>
                    <DrawerTrigger>
                        <button
                            type="button"
                            className="surface-1 hover:bg-surface-2 flex size-10 items-center justify-center rounded-full transition-colors"
                        >
                            <EllipsisVertical className="size-5" />
                        </button>
                    </DrawerTrigger>
                    <DrawerContent className="flex flex-col space-y-2">
                        {actions?.map(action => {
                            const {name, Component} = action
                            return <Component key={name} appointmentId={appointment.id} />
                        })}
                    </DrawerContent>
                </BottomDrawer>
            </section>
            <section className="centered-col space-y-4 ">
                <div className="size-40 rounded-full bg-surface-1 row-span-3 self-center" />
                <H3 className=" self-center">{appointment.client.name}</H3>
            </section>
            <DetailSection className="">
                <li className="flex items-center space-x-2">
                    <Clock strokeWidth={1} />
                    <Caption className="text-base">{timeString}</Caption>
                </li>
                <li className="flex items-center space-x-2">
                    <Scissors strokeWidth={1}/>
                    <Caption className="text-base">{services}</Caption>
                </li><li className="flex items-center space-x-2">
                    <Store strokeWidth={1}/>
                    <Caption className="text-base">{appointment.store.name}</Caption>
                </li>
            </DetailSection>
            <DetailSection title="Notes" className="">
                <Body>
                    feafea
                </Body>
                <Body className="spaced">
                    <span className="">Added by Michael Smith • May 20, 2024 9:41 AM</span>
                    <button type="button" className="text-blue-400 hover:text-blue-500 hover:cursor-pointer">Edit</button>
                </Body>
            </DetailSection>
            <section className="stacked md:space-y-4    ">
                <div className="flex items-center space-x-3 p-4 bg-surface-1">
                    <Clock />
                    <Body className="">Checked-in at</Body>
                    <Body className="ml-auto">10:25 AM</Body>
                </div>
            </section>

        </main>
    );
}