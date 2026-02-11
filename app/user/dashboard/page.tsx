import { SearchParamsType } from "@/lib/queries/types";
import Link from "next/link";

export default async function UserDashboard ({ searchParams }: SearchParamsType) {

    return (
        <div className="">
            this is the dashboard page
            <Link href={"/user/booking"} className="btn" >create a booking</Link>
        </div>
    );
}