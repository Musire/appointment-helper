import { cn } from "@/lib/utils";
import * as React from "react";
import { createPortal } from "react-dom";
import { useDrawerContext } from "./BottomDrawer";

type ContentProps = {
  className?: string;
  children: React.ReactNode;
  title?: string;
};

export default function DrawerContent({ children, title = "Actions", className }: ContentProps) {
  const { isOpen, onClose } = useDrawerContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        role="presentation"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="max-h-[80vh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-zinc-900 pb-safe">
          <div className="flex justify-center py-3">
            <div className="h-1.5 w-12 rounded-full bg-zinc-700" />
          </div>

          <div className={`px-6 pb-8 ${className}`}>
            <h2 className="mb-6 text-lg font-semibold text-white">{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
