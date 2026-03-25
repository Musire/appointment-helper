'use client';
import { ArrowLeft } from "lucide-react";

{/* <button onClick={logout} type="button" className="btn">logout</button> */}

function BackButton () {
    return (
        <button type="button" className="normal-space hover:cursor-pointer text-else hover:text-main flex items-center space-x-4">
            <ArrowLeft />
            <p className="">Back</p>
        </button>
    );
}

export default function header () {
    return (
        <div className=" border-b border-whitesmoke/15 w-full h-20 spaced">
            <div className="flex items-center space-x-4">
                <BackButton />
                <p className="text-2xl">Dashboard</p>
            </div>
            <div className="flex items-center space-x-2">
                <div className="bg-mid rounded-full size-10" />
                <div className="bg-mid rounded-full size-10" />
            </div>
        </div>
    );
}