'use client';

import { BookingContextType, DatetimeSlot, ServiceSlot, StaffBrief, StaffSlot, StoreBrief, StoreSlot } from "@/domains/booking";
import { Service, Store, User } from "@/generated/prisma";
import { useFetch } from "@/hooks";
import { formatCurrency } from "@/lib/stringMutate";
import { useStepper } from "../../context";
import { ContinueButton, Header, Indicator } from "../page";

type ReviewData = {
    store: Store,
    staff: User,
    services: Service,
    date: string;
    time: string
}

export default function ReviewStep () {
    const { flow, formData, back, steps } = useStepper()

    const { status, data, error } = useFetch<ReviewData | null>('/api/review', { method: 'POST', body: {
            store: formData.storeId,
            staff: formData.staffId,
            services: formData.serviceId,
            dateTime: formData.dateTime
        } 
    })

    if (status === 'idle') return null;

    if (status === 'loading') {
        return <p className="">loading...</p>
    }

    if (!data) {
        return <p className="text-error-dark">{error}</p>
    }


    const {store, staff, services, date, time} = data

    const handleContinue = () => {
        console.log(formData)
    }

    return (
        <div className="w-full flex flex-col space-y-6">
            <Header {...{back}} title="Review and Confirm" />
            <Indicator {...{steps}} index={7} />
            <h2 className="font-semibold text-lg">Summary</h2>
            <ul className="flex space-y-2 flex-col items-center">
                <StoreSlot store={store} />
                <StaffSlot staff={staff} />
                <ServiceSlot service={services} />
                <DatetimeSlot datetime={{date, time}} />
            </ul>
            <span className="spaced px-4">
                <p className="text-lg font-semibold">Total</p>
                <p className="">{formatCurrency(services.priceCents)}</p>
            </span>
            
            <ContinueButton onContinue={handleContinue} />
        </div>
    );
}