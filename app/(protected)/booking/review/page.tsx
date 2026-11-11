import { getBookingReview } from "@/domains/booking/booking.queries";
import { ReviewStep } from "@/features/booking/components";
import { SearchParamsType } from "@/lib/types";

export default async function BookingService({ searchParams }: SearchParamsType) {
    const params = await searchParams;

    const storeId = params.store;
    const staffId = params.staff;

    const serviceIds = params.service
        ? Array.isArray(params.service)
            ? params.service
            : [params.service]
        : [];

    const dateTime = Array.isArray(params.dateTime)
        ? params.dateTime[0]
        : params.dateTime;

    if (!storeId || !staffId || !dateTime || serviceIds.length === 0) {
        return <div>Missing booking information.</div>;
    }

    const [date, seconds] = dateTime.split(" ");

    if (!date || !seconds || !Number.isFinite(Number(seconds))) {
        return <div>Invalid booking date or time.</div>;
    }

    const payload = {
        storeId,
        staffId,
        serviceIds,
        date,
        time: Number(seconds),
    };

    const { data: bookingData } = await getBookingReview(payload);

    if (!bookingData) {
        return <div>Unable to retrieve booking information.</div>;
    }

    console.log(bookingData)

    return (
        <div className="flex flex-1 p-6">
            <ReviewStep data={bookingData} />
        </div>
    );
}