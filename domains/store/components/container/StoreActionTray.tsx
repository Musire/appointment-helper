"use client";

import { ContainerMode } from "@/hooks/useSelectable";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminHeaderProps {
  resourceBasePath: "/admin/post" | "/admin/category" | string;
  mode: ContainerMode;
  onModeChange: (mode: ContainerMode) => void;
}

export default function StoreActionTray({
  resourceBasePath,
  mode,
  onModeChange,
}: AdminHeaderProps) {
  const pathname = usePathname();

  const actions = [
    {
      key: "create",
      href: `${resourceBasePath}/new`,
      icon: <Plus size={30} strokeWidth={1} />,
    },
    {
      key: "edit",
      mode: "edit" as const,
      icon: <Pencil size={30} strokeWidth={1} />,
    },
    {
      key: "delete",
      mode: "delete" as const,
      icon: <Trash2 size={30} strokeWidth={1}/>,
    },
  ];

  return (
    <div className="spaced">
      <span className="flex space-x-2 justify-end items-center ml-auto">
        {actions.map(action => {
          const isActive =
            action.mode && mode === action.mode;

          const baseClass =
            "hover:cursor-pointer capitalize shrink size-14 xs:max-sm:p-3 sm:normal-space centered rounded-full hover:cursor-pointer hover:bg-surface-1 active:bg-surface-2  ";

          if (action.href) {
            return (
              <Link
                key={action.key}
                href={action.href}
                className={baseClass}
              >
                <span className="">
                  {action.icon}
                </span>
              </Link>
            );
          }

          return (
            <button
              key={action.key}
              type="button"
              className={`${baseClass} ${
                isActive
                  ? "bg-whitesmoke text-deeper hover:opacity-80 hover:bg-whitesmoke "
                  : ""
              }`}
              onClick={() =>
                action.mode &&
                onModeChange(action.mode)
              }
            >
              <span className="">
                {action.icon}
              </span>
            </button>
          );
        })}
      </span>
    </div>
  );
}
