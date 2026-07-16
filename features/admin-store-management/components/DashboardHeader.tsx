import { Body, BodySm, H3 } from "@/components/UI";
import { MapPin, Pencil, Store } from "lucide-react";
import Link from "next/link";

export default function DashboardHeader () {
    return (
        <div className="stacked relative">
            <span className="flex items-center space-x-6">
                <Store className="p-4 bg-surface-1 rounded-md centered size-20 text-alternate" strokeWidth={1} />
                <H3>Store Two</H3>
            </span>
            <ul className="flex w-full ">
                <li className="grid grid-cols-[3rem_1fr] place-content-center gap-x-2 bg-surface-1 p-4 w-full text-else">
                    <MapPin strokeWidth={1} className="row-span-2 p-2 w-full h-full" />
                    <Body className="">Address</Body>
                    <BodySm className="text-main col-start-2">123 example street</BodySm>
                </li>
                <li className="grid grid-cols-[3rem_1fr] place-content-center gap-x-4 bg-surface-1 p-4 w-full text-else">
                    <div className="size-12 bg-surface-3 centered rounded-full row-span-2">
                        <div className="rounded-full size-6 bg-success"></div>
                    </div>
                    <Body className="">Status</Body>
                    <BodySm className="text-main col-start-2">Active</BodySm>
                </li>
            </ul>
            <Link href="" className="absolute rounded-md border-border border right-4 top-4 flex items-center space-x-2 py-3 px-4 hover:bg-surface-2 active:bg-surface-1">
                <Pencil size={20} strokeWidth={1} />
                <Body>Edit Store</Body>
            </Link>
        </div>
    );
}