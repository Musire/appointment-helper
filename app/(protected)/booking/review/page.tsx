import { ReviewStep } from "@/features/booking";
import { getBookingReviewData } from "@/features/booking/queries/getBookingReviewData";
import { SearchParamsType } from "@/lib/types";

export default async function BookingService ({ searchParams }: SearchParamsType) {
    const params = await(searchParams)
    const {store} = params

    if (!store) return <div className="">some error</div>;

    const data = await getBookingReviewData(params);
    console.log('data', data)

    return (
        <div className="flex w-full h-full">
            <ReviewStep {...data}/>   
        </div>
    );
}