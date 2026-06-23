import { Body, Caption, H3 } from "@/components/UI";
import { Button } from "@/components/ui/button";
import { Clock, Scissors, User } from "lucide-react";

export default function PoolDetails () {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 space-y-3 scrollbar-adjust py-6 pr-4 overflow-y-auto">
            <div className="self-center centered-col space-y-2">
                <div className="size-40 rounded-full bg-surface-1" />
                <H3 className="">Juan Dela Cruz</H3>
            </div>
            <div className="stacked md:space-y-4    ">
                <div className="bg-surface-1 w-full p-4 flex flex-col space-y-2 ">
                    <Body className="flex items-center space-x-2 h-10">
                        <Clock />
                        <Caption className="text-base">10:30 AM</Caption>
                    </Body>
                    <Body className="flex items-center space-x-2  h-10">
                        <Scissors />
                        <Caption className="text-base">Natural Haircut</Caption>
                    </Body>
                    <Body className="flex items-center space-x-2 h-10">
                        <User />
                        <Caption className="text-base">No Notes</Caption>
                    </Body>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-surface-1">
                    <Clock />
                    <Body className="">Checked-in at</Body>
                    <Body className="ml-auto">10:25 AM</Body>
                </div>
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
                <Button className="h-16 text-fluid-xl">Start Service</Button>
                </div>
        </div>
    );
}