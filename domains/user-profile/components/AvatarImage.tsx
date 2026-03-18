'use client';

import { Skeleton } from "@/components/UI";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type Props = {
    imageUrl: string | null;
    className?: string;
}

export default function AvatarImage({ imageUrl, className }: Props) {
    const [isLoading, setIsLoading] = useState(true);

    if (!imageUrl) {
        return <div className={cn("bg-darkest mx-auto mb-3", className)} />;
    }

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {isLoading && (
                <Skeleton className="absolute inset-0 h-full w-full" />
            )}
            <Image 
                src={imageUrl}
                alt="User avatar"
                loading="eager"
                fill
                sizes="(max-width: 768px) 100vw, 250px"
                className={cn(
                    "object-cover object-center transition-opacity duration-300",
                    isLoading ? "invisible" : ""
                )}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}
