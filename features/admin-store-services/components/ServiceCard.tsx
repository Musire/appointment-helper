'use client'; 

import { Body } from "@/components/UI";
import { service } from "@/domains/service/components/ServiceContainer";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type ServiceCardProps = {
  service: service
  onEdit?: () => void
  onDelete?: () => void
}

export default function ServiceCard({
  service,
  onEdit,
  onDelete,
}: ServiceCardProps) {
  const [open, setOpen] = useState(false)
  const { name, price } = service

  return (
    <li className="relative rounded-lg border h-fit bg-surface-1 border-border w-full p-4 ">
      <div className="flex items-start justify-between gap-4">
        <Body className="capitalize">{name}</Body>
        <Body className="">{price}</Body>

        {/* Kebab */}
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="rounded-full p-1 text-muted-foreground hover:bg-darker border border-transparent hover:border-whitesmoke/20 focus:outline-none"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      {open && (
        <div className=" z-10 w-40 rounded-lg  ">
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onEdit?.()
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-darker"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onDelete?.()
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-error-dark hover:bg-darker"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </li>
  )
}
