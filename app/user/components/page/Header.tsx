'use client';

import { ArrowLeft } from "lucide-react";

type HeaderProps = {
    title?: string,
    onBack?: () => void;
}

export default function Header ({ title, onBack }: HeaderProps) {
    return (
        <span className="w-full flex">
            {onBack && (
                <button onClick={onBack} className="hover:cursor-pointer">
                    <ArrowLeft size={30} />
                </button>
            )}
            <p className="mx-auto capitalize">{title}</p>
        </span>
    );
}