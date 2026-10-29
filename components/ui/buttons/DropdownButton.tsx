
"use client";

import { useDrawer } from "@/hooks";
import clsx from "clsx";
import { Check } from "lucide-react";
import { ElementType, useState } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownButtonProps<T extends string> {
    Icon?: ElementType;
    buttonStyle?: string;
    drawerStyle?: string;
    options: T[];
    value?: T;
    selectedValues?: T[];
    onChange?: (value: T) => void;
    multiple?: boolean;
}

export default function DropdownButton<T extends string>({
    Icon,
    buttonStyle,
    drawerStyle,
    options = [],
    value,
    selectedValues = [],
    onChange,
    multiple = false,
}: DropdownButtonProps<T>) {
    const { isMounted, animation, closeDrawer, toggleDrawer } =
        useDrawer();

    const [internalState, setInternalState] = useState<T | "">("");

    const selected = value !== undefined ? value : internalState;

    const handleSelect = (option: T) => {
        if (multiple) {
            // Send only the clicked option to the parent.
            onChange?.(option);
            return;
        }

        if (onChange) {
            onChange(option);
        } else {
            setInternalState(option);
        }

        closeDrawer();
    };

    const getDisplayText = () => {
        if (multiple) {
            if (selectedValues.includes("all" as T)) {
                return "All Statuses";
            }

            if (selectedValues.length === 0) {
                return "No Statuses";
            }

            return `${selectedValues.length} Status${selectedValues.length === 1 ? "" : "es"}`;
        }

        return selected || "Select Option";
    };

    return (
        <div className="relative text-else">
            <button
                type="button"
                onClick={toggleDrawer}
                className={twMerge(
                    "snappy spaced gap-x-2 bg-background hover:bg-surface-1 text-sm capitalize w-full border border-border rounded-lg normal-space text-else",
                    buttonStyle
                )}
            >
                {getDisplayText()}
                {Icon && <Icon size={25} />}
            </button>

            {isMounted && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={closeDrawer}
                    />

                    <aside
                        className={twMerge(
                            clsx(
                                "absolute bg-background w-32 border border-adjust z-20 max-h-40 overflow-y-auto scrollbar-none top-12 rounded-xl",
                                animation
                                    ? "animate-ghostIn"
                                    : "animate-ghostOut"
                            ),
                            drawerStyle
                        )}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <ul className="flex flex-col w-full">
                            {options.map((option) => {
                                const isSelected = multiple
                                    ? selectedValues.includes(option)
                                    : selected === option;

                                return (
                                    <li key={option}>
                                        <button
                                            type="button"
                                            onClick={() => handleSelect(option)}
                                            className="flex items-center text-else w-full text-sm text-left capitalize px-3 py-1 hover:bg-surface-1 hover:text-main easy-transition gap-x-2"
                                        >
                                            {multiple && (
                                                <span className="w-4">
                                                    {isSelected && (
                                                        <Check className="w-4 h-4 text-primary" />
                                                    )}
                                                </span>
                                            )}

                                            <span>{option}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </aside>
                </>
            )}
        </div>
    );
}
