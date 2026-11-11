'use client';


import { Service, Store, User } from "@/generated/prisma";
import { formatCurrency } from "@/lib/utils/stringMutate";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createBooking } from "../../../../domains/booking/booking.actions";
import { DatetimeCard } from "../cards";
import { SubmitButton } from "../page";
import ServiceSlot from "../slots/ServiceSlot";
import StaffSlot from "../slots/StaffSlot";
import StoreSlot from "../slots/StoreSlot";

type ReviewData = {
    store: Store | null,
    staff: User | null,
    services: Service[],
    date: string;
    time: number;
}

type Props = {
  data: ReviewData
}

export default function ReviewStep ({data}: Props) {
    const { store, staff, services, date, time } = data
    const router = useRouter()
    const [isPending, startTransition] = useTransition();

    if (!store || !staff || !services.length || !date || !time) {
        return (
            <div className="">
                <p className="">review incomplete</p>
            </div>
        )
    }

    const submission = () => {
        startTransition(async () => {
            await createBooking({
                storeId: store.id,
                staffId: staff.id,
                serviceIds: services.map(s => s.id),
                time: Number(time),
                date,
            });
        })

    }

    return (
        <div className="w-full flex flex-1  flex-col space-y-6 py-6">
            <ul className="stacked space-y-2 w-full bg-surface-1 divide-y divide-disabled gap-y-4 p-6 rounded-lg">
                <StoreSlot store={store} />
                <StaffSlot staff={staff} />
                <ServiceSlot services={services} />
                <DatetimeCard datetime={{ date, time }} />
            </ul>
            <span className="spaced pt-6 border-t mt-auto border-disabled">
                <p className="text-xl font-light">Total</p>
                <p className="text-2xl font-semibold">{formatCurrency(services.reduce((sum, item) => sum + item.price, 0))}</p>
            </span>
            <SubmitButton onBack={() => router.back()} action={submission}  />
        </div>
    );
}