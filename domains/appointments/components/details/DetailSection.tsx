import { H3 } from "@/components/UI";
import React from "react";

export function SectionHeader () {
    return (
        <div className=""></div>
    );
}

type SectionProps = { 
    title?: string;
    className?: string;
    children: React.ReactNode;
}

export default function DetailSection ({
    title,
    className, 
    children 
}: SectionProps) {
    return (
        <section className="p-4 bg-surface-1 stacked space-y-2">
            {title && <H3 className="">{title}</H3>}
            <div className={`stacked space-y-2 ${className}`}>
                {children}
            </div>
        </section>
    );
}

