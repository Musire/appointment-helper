'use client';

import { StaffBrief } from "./StaffCard";
import StaffSearch from "./StaffSearch";

type StaffStepProps = { 
    changeAnchor: (v: string) => void;
    staff: StaffBrief[]
}

export default function StaffStep ({ changeAnchor, staff }: StaffStepProps) {
    const activeStyle = 'border-b-2 border-whitesmoke/87 text-whitesmoke/87'
    const inActiveStyle = 'text-whitesmoke/37 hover:text-whitesmoke/60'

    console.log('staff', staff)

    return (
        <div className="flex flex-col space-y-6">
            <span className="flex items-center space-x-4 ">
                <button 
                    onClick={() => changeAnchor('store')}
                    className={`px-3 py-2 transition-colors hover:cursor-pointer ${inActiveStyle}`}
                >
                    Store
                </button>
                <p className={`px-3 py-2 ${activeStyle}`}>Staff</p>
            </span>
            <StaffSearch staff={staff} />
        </div>
    );
}