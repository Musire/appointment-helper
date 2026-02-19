'use client';

import { useFetch } from "@/hooks";
import { User } from "lucide-react";

type StaffDetailsProps = {
    userId: string | null;
}

type ResultData = {
    id: string;
    bio: string;
    user: {
        fullName: string;
    }
}

export default function StaffDetails ({ userId }: StaffDetailsProps) {

    const { status, error, data } = useFetch<ResultData | null>('/api/staffDetails', 
        {
            method: 'POST', 
            body: { userId }
        })

    if (status === 'idle') {
        return null
    }

    if (status === 'loading') {
        return <p className="">loading ...</p>
    }

    if (error) {
        return <p className="text-error-dark">{error}</p>
    }

    console.log(data)
    return (
        <div className="flex flex-col items-center space-y-6">
            <User size={100} strokeWidth={1} className="p-4 rounded-full bg-darkest border-2 border-whitesmoke/15" />
            <span className="flex flex-col items-center">
                <p className="capitalize text-whitesmoke/87">{data?.user.fullName}</p>
                <p className="capitalize text-whitesmoke/60">barber</p>
            </span>
            <p className="">{data?.bio}</p>
        </div>
    );
}