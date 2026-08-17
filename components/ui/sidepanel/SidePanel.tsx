import { AnimationState } from "@/hooks/useDrawer";
import clsx from "clsx";

type Props = {
    onClose: () => void;
    isMounted: boolean;
    animation: AnimationState;
}

export default function SidePanel ({ onClose, isMounted, animation }: Props) {
    if (!isMounted) return null;
    const animating = animation ? "animate-slide-left" : "animate-slide-right"

    return (
        <div onClick={onClose} className="absolute inset-0 backdrop-blur-xs bg-deep/30 z-20 w-dvw h-dvh">
            <aside 
                className={clsx(
                    "absolute right-0 top-0 z-30 bg-deep xs:w-5/6 desktop:w-120 h-dvh p-6 border-l border-disabled", animating
                )}>
                hi it's me mario
            </aside>
        </div>
    );
}