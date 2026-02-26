'use client';

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessDisplay () {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
        router.push("/dashboard"); // change route
        }, 2500);

        return () => clearTimeout(timer); // cleanup
    }, [router]);
    
    return (
        <div className=" bg-darkest h-[50dvh] p-6 centered">
            <article className=" w-72 h-60 p-6 flex flex-col space-y-4 items-center">
                <div className="p-6 rounded-full centered border-2 border-success-dark text-success-dark">
                    <Check size={75} />
                </div>
                <p className="capitalize">
                    Booking successfully submitted
                </p>
                <p className="text-xs text-whitesmoke/60">
                    You'll be redirected shortly 
                </p>

            </article>
        </div>
    );
}