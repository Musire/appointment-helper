'use client'

import { ArrowLeft } from "lucide-react";

export default function BackButton ({ onBack }: { onBack: () => void}) {
    return (
        <button 
            onClick={onBack} 
            className="hover:cursor-pointer"
        >
            <ArrowLeft />
        </button>
    );
}