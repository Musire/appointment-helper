'use client';

import { useFetch } from "@/hooks";
import { User } from "lucide-react";
import { ContinueButton, Header, Indicator } from "../page";

type StaffDetailsProps = {
    staffId: string | null;
    storeStaffId: string | null;
    steps: string[];
    anchor: string;
    onBack: () => void;
    onChange: () => void;
}

type ResultData = {
    id: string;
    bio: string;
    user: {
        fullName: string;
    }
}

export default function StaffDetailsStep ({ 
    staffId, 
    storeStaffId, 
    steps, 
    anchor,
    onBack, 
    onChange }: StaffDetailsProps) {

    const { status, error, data } = useFetch<ResultData | null>('/api/staffDetails', 
        {
            method: 'POST', 
            body: { userId: staffId || storeStaffId }
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

    return (
        <>
            <Header onBack={onBack} />
            <Indicator steps={steps} index={anchor === 'store' ? 4 : 2} />
            <div className="flex flex-col items-center space-y-6">
                <User size={100} strokeWidth={1} className="p-4 rounded-full bg-darkest border-2 border-whitesmoke/15" />
                <span className="flex flex-col items-center">
                    <p className="capitalize text-whitesmoke/87">{data?.user.fullName}</p>
                    <p className="capitalize text-whitesmoke/60">barber</p>
                </span>
                <p className="">{data?.bio}</p>
            </div>
            <ContinueButton onContinue={onChange} />
        </>
    );
}