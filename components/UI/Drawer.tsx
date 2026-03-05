import { AnimationState } from "@/hooks/useDrawer";

type Props = {
    animation: AnimationState;
    isMounted: boolean;
    children: React.ReactNode
}

export default function ComponentName ({ animation, isMounted, children }: Props) {
    if (!isMounted) return null;

    return (
        <div className={`${animation ? 'animate-ghostIn': 'animate-ghostOut'}`}>
            {children}
        </div>
    );
}