'use client';

import { useThemeState } from "@/hooks";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";


export default function Theme () {
    const { isDark, toggleTheme } = useThemeState()
    
    return (
        <button onClick={toggleTheme} className="surface-2 rounded-full h-8 px-1 w-14 flex items-center relative">
            <div className={clsx(
                "size-6 blip p-1 centered rounded-full bg-background",
                {
                    "translate-x-full border-border border ": isDark,
                }
                
            )}>
                {!isDark ? <Sun /> : <Moon />}
            </div>
        </button>
    );
}