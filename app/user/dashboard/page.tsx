import { NextAppointment, LaterAppointments } from "@/domains/upcoming/components";
import { appointments } from "@/domains/upcoming/mockData/test-appointments"
import Link from "next/link";


export default function UpcomingPage () {
    return (
        <div className="py-6 flex flex-col space-y-6">
            <NextAppointment />
            <LaterAppointments {...{appointments}} />
            <Link 
                href={"/user/booking"} 
                className="btn capitalize size-10 centered text-2xl rounded-full absolute right-6 bottom-6" 
            >
                +
            </Link>
        </div>
    );
}
