'use client';

import { Plus } from "lucide-react";
import Link from "next/link";

export default function ServiceCreation () {
    return (
        <div className="absolute bottom-6 right-6 flex flex-col-reverse ">
            <Link 
                href="services/new" 
                className="size-12 bg-surface-1 centered rounded-full"
            >
                <Plus />
            </Link>
        </div>
    );
}