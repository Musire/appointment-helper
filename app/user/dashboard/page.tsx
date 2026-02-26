import { SearchParamsType } from "@/lib/queries/types";
import Link from "next/link";

export default async function UserDashboard ({ searchParams }: SearchParamsType) {

    return (
        <div className="flex flex-col space-y-6">
            <p className="">
                This is the dashboard page
            </p>
            <Link href={"/user/booking"} className="btn capitalize" >create a booking</Link>
        </div>
    );
}