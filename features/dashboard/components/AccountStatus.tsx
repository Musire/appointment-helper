
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Requirement } from "@/domains/profile/profile.types";
import { AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

type Props = {
  active: boolean;
  requirements: Requirement[];
};

export default function AccountStatus({
  active,
  requirements,
}: Props) {
  const [open, setOpen] = useState(false);
  const status = active ? "Active" : "Inactive"
  const colorStyle = active 
    ? "text-success border-success bg-success/20 hover:bg-success/30" 
    : " text-alternate border-alternate bg-alternate/10 border-warning/30 bg-warning/10 hover:bg-warning/20 focus-visible:ring-warning"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={(e) => {
            e.currentTarget.blur();
            setOpen(false);
          }}
          className={`
            h-8 w-32 centered gap-2 group cursor-pointer rounded-full 
            border text-sm font-medium transition
            focus-visible:outline-none focus-visible:ring-2
            ${colorStyle}
          `}
        >
          {status}
          <AlertCircle size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
        side="bottom"
        sideOffset={20}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="w-72 space-y-3 rounded-xl bg-surface-1 text-main"
      >
        <div className="flex items-center gap-2">
          {!active && <AlertCircle className="size-5 text-alternate" />}
          <h3 className="font-semibold">Account Requirements</h3>
        </div>

        <p className="text-xs text-else">
          Complete the following requirements to activate your account.
        </p>

        <ul className="space-y-3">
          {requirements.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              {item.completed ? (
                <CheckCircle2 className="size-4 shrink-0 text-success" />
              ) : (
                <Circle className="size-4 shrink-0 text-muted-foreground" />
              )}

              <span
                className={
                  item.completed
                    ? "text-muted-foreground"
                    : "text-foreground"
                }
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
