
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

type Props = {
  active: boolean;
  requirements?: {
    label: string;
    completed: boolean;
  }[];
};

export default function AccountStatus({
  active,
  requirements = [
    { label: "Complete your profile", completed: true },
    { label: "Submit required documents", completed: false },
    { label: "Wait for store approval", completed: false },
  ],
}: Props) {
  const [open, setOpen] = useState(false);

  if (active) {
    return (
      <div className=" w-32 h-8 centered rounded-full bg-success/20 text-success text-sm font-medium">
        Active
      </div>
    );
  }

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
          className="group cursor-pointer  flex h-8 w-32 items-center justify-center  gap-2 rounded-full border border-warning/30 bg-warning/10 text-sm font-medium text-alternate border-alternate bg-alternate/10 transition hover:bg-warning/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning"
        >
          Inactive
          <AlertCircle size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
        side="bottom"
        sideOffset={8}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="w-72 space-y-4 rounded-xl bg-surface-1 text-main"
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="size-5 text-alternate" />
          <h3 className="font-semibold">Account inactive</h3>
        </div>

        <p className="text-sm text-muted-foreground">
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
