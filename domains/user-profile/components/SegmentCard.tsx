import { ReactNode } from "react";

export default function SegmentCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="surface-1 rounded-xl px-4 py-3">
      <h2 className="text-sm font-semibold text-main mb-2">
        {title}
      </h2>
      <div className="divide-y test-else">
        {children}
      </div>
    </div>
  );
}