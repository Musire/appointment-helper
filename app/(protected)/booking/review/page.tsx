import { getBookingReviewData } from "@/domains/booking/booking.queries";
import { ReviewStep } from "@/features/booking/components";
import { SearchParamsType } from "@/lib/types";

export default async function BookingService ({ searchParams }: SearchParamsType) {
    const params = await(searchParams)
    const {store} = params

    if (!store) return <div className="">some error</div>;

    const data = await getBookingReviewData(params);
    console.log('data', data)

    return (
        <div className="flex flex-1 p-6">
            <ReviewStep {...data}/>   
        </div>
    );
}