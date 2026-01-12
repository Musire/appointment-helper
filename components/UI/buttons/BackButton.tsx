'use client';

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton ({ className }: { className: string }) {
    const router = useRouter();

    return (
    <button type='button' onClick={() => router.back()} className={cn('spaced space-x-3 text-whitesmoke/60 hover:text-whitesmoke active:text-whitesmoke hover:cursor-pointer', className)}>
        <ArrowLeft size={20} />
        <p className="">Back</p>
    </button>
    );
}