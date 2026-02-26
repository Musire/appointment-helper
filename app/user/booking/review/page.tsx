import { ReviewStep } from "@/domains/booking";
import { getBookingReviewData } from "@/lib/queries/review";
import { SearchParamsType } from "@/lib/queries/types";

export default async function BookingService ({ searchParams }: SearchParamsType) {
    const params = await(searchParams)
    const {store} = params

    if (!store) return <div className="">some error</div>;

    const data = await getBookingReviewData(params);

    return (
        <div className="">
            <ReviewStep {...data}/>   
        </div>
    );
}