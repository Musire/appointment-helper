"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  
  const pathSegments = pathname.split("/").filter(Boolean);
  const isNested = pathSegments.length > 3;

  const handleGoUp = () => {
    // Remove the last segment to go "up" one level
    const parentPath = "/" + pathSegments.slice(0, -1).join("/");
    router.push(parentPath);
  };

  return (
    <button
      type="button"
      onClick={handleGoUp}
      className={`normal-space hover:cursor-pointer text-else hover:text-main flex items-center space-x-4 ${
        !isNested ? "invisible pointer-events-none" : "visible"
      }`}
    >
      <ArrowLeft />
      <p>Back</p>
    </button>
  );
}
