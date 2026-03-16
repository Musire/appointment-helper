'use client'; 

import { User as Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface StaffUser {
  id: string;
  fullName?: string | null;
  email: string;
  createdAt?: Date;
}

type StaffSlotProps = {
  staff: StaffUser;
};

export default function StaffCard({ staff }: StaffSlotProps) {

  const [imgError, setImgError] = useState(false);

  const avatarPath = `/${staff.fullName}.png`;

  return (
    <li className="relative focus:outline-none snap-center touch-pan-x  aspect-4/5 flex items-end rounded-xl min-w-48 overflow-hidden h-66 card ">

      {/* fallback icon background */}
      <div className="absolute inset-0 flex items-center justify-center bg-darkest text-main">
        <Icon size={80} strokeWidth={1} />
      </div>

      {/* avatar image */}
      {!imgError && (
        <Image
          src={avatarPath}
          alt={`staff-${staff.id}`}
          fill
          className="object-cover object-[center_0] saturate-[.75]"
          onError={() => setImgError(true)}
        />
      )}

      {/* text overlay */}
      <div className="stacked space-y-1 rounded-xl w-[85%] bg-deep p-4 absolute bottom-4 left-1/2 -translate-x-1/2">
        <p className="text-main capitalize text-sm">
          {staff.fullName ?? "Unknown"}
        </p>

        <p className="text-xs text-else capitalize">
          barber
        </p>
      </div>

    </li>
  );
}