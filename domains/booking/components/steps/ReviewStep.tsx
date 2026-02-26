'use client';

import {
    DatetimeCard,
    ServiceCard,
    StaffCard,
    StoreCard,
} from "@/domains/booking";
import { Service, Store, User } from "@/generated/prisma";
import { formatCurrency } from "@/lib/stringMutate";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createBookingAction } from "../../actions/booking.action";
import { Header, Indicator, SubmitButton, SuccessDisplay } from "../page";

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
        <div className="w-full flex flex-col space-y-6">
            <Header onBack={() => router.back()} title="Review and Confirm" />
            <Indicator index={5} />
            {!success && (
                <>
                    <h2 className="font-semibold text-lg">Summary</h2>
                    <ul className="flex space-y-2 flex-col items-center">
                        <StoreCard store={store} />
                        <StaffCard staff={staff} />
                        <ServiceCard service={services} />
                        <DatetimeCard datetime={{ date, time }} />
                    </ul>
                    <span className="spaced px-4">
                        <p className="text-lg font-semibold">Total</p>
                        <p className="">{formatCurrency(services.priceCents)}</p>
                    </span>

                    {error && (
                        <div className="p-4 bg-red-100 text-error-dark rounded">
                            {error}
                        </div>
                    )}
                    <SubmitButton action={action}  />
                </>
            )}
            {success && <SuccessDisplay /> }
        </div>
    );
}