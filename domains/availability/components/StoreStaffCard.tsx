import { ChevronRight, Store } from "lucide-react";
import Link from "next/link";

type StoreStaff = {
  id: string;
  name: string;
};

type Props = {
  storeStaff: StoreStaff;
};

export default function StoreStaffCard({ storeStaff }: Props) {
  return (
    <Link
      href={`/stores/${storeStaff.id}/availability`}
      aria-label={`Manage availability at ${storeStaff.name}`}
      className="flex items-center gap-5 rounded-2xl border border-white/10 bg-linear-to-r from-[#141414] to-[#0b0b0b] p-5 transition hover:border-border"
    >
      <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/10">
        <Store size={28} strokeWidth={1.8} />
      </span>

      <span className="flex-1">
        <span className="block text-lg text-main capitalize">
          {storeStaff.name}
        </span>

        <span className="block text-sm text-else">
          Manage your availability
        </span>
      </span>

      <ChevronRight
        size={24}
        className="shrink-0 text-zinc-400"
        aria-hidden="true"
      />
    </Link>
  );
}