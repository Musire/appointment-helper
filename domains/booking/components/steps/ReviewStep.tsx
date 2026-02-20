'use client';

import { BookingContextType, DatetimeSlot, ServiceSlot, StaffBrief, StaffSlot, StoreBrief, StoreSlot } from "@/domains/booking";
import { Service, Store, User } from "@/generated/prisma";
import { useFetch } from "@/hooks";
import { formatCurrency } from "@/lib/stringMutate";
import { ContinueButton, Header, Indicator } from "../page";

type ReviewData = {
    store: Store,
    staff: User,
    services: Service,
    date: string;
    time: string
}


type ReviewStepProps = {
    stores: StoreBrief[];
    staff: StaffBrief[];
    value: BookingContextType;
    onBack: () => void;
    onSubmit: (value: BookingContextType) => void;
    steps: string[];
}

export default function ReviewStep ({ 
    value, 
    onBack, 
    onSubmit, 
    steps 
}: ReviewStepProps) {
    const {anchor, ...booking} = value

    const { status, data, error } = useFetch<ReviewData | null>('/api/review', { method: 'POST', body: {
            store: booking.store || booking.staffStore,
            staff: booking.staff || booking.storeStaff,
            services: booking.services,
            dateTime: booking.dateTime
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
        onSubmit(value)
    }

    return (
        <div className="w-full flex flex-col space-y-6">
            <Header {...{onBack}} title="Review and Confirm" />
            <Indicator {...{steps}} index={5} />
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