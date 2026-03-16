'use client';

import {
    DatetimeCard,
} from "@/domains/booking";
import { Service, Store, User } from "@/generated/prisma";
import { formatCurrency } from "@/lib/stringMutate";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createBookingAction } from "../../actions/booking.action";
import { Header, SubmitButton, SuccessDisplay } from "../page";
import ServiceSlot from "../slots/ServiceSlot";
import StaffSlot from "../slots/StaffSlot";
import StoreSlot from "../slots/StoreSlot";

type ReviewData = {
    store: Store,
    staff: User,
    services: Service,
    date: string;
    time: string
}

export default function ReviewStep ({ store, staff, services, date, time }: ReviewData) {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();

    const action = () => {
        setError(null);

        startTransition(async () => {
            const result = await createBookingAction({
                storeId: store.id,
                staffId: staff.id,
                serviceId: services.id,
                date,
                time,
            });

            console.log(result)

            if (result.success) {
            setSuccess(true);
            } else {
            setError(result.error ?? "Something went wrong.");
            }
        });
    };

    return (
        <div className="w-full flex flex-col space-y-6  h-[70dvh]">
            <Header 
                step={5}
                max={5}
                title="Review the Booking" 
                subtitle="Make sure everything looks good and confirm"    
            />
            {!success && (
                <>
                    <ul className="stacked space-y-2 ">
                        <StoreSlot store={store} />
                        <StaffSlot staff={staff} />
                        <ServiceSlot service={services} />
                        <DatetimeCard datetime={{ date, time }} />
                    </ul>
                    <span className="spaced pt-6 border-t-2 mt-auto border-disabled">
                        <p className="text-2xl">Total</p>
                        <p className="text-2xl font-semibold">{formatCurrency(services.priceCents)}</p>
                    </span>

                    {error && (
                        <div className="p-4 bg-red-100 text-error-dark rounded">
                            {error}
                        </div>
                    )}
                    <SubmitButton onBack={() => router.back()} action={action}  />
                </>
            )}
            {success && <SuccessDisplay /> }
        </div>
    );
}