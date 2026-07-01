'use client'; 

import { ServiceType } from "@/lib/helpers/groupArrays";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type ServiceCardProps = {
  service: ServiceType
  onEdit?: () => void
  onDelete?: () => void
}

export default function ServiceCard({
  service,
  onEdit,
  onDelete,
}: ServiceCardProps) {
  const [open, setOpen] = useState(false)
  const { name, durationMin, priceCents} = service

  return (
    <div className="relative rounded-xl border bg-darkest border-whitesmoke/20 w-48  p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-whitesmoke/87 capitalize">
            {name}
          </h3>

          <div className="mt-1 flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="font-medium text-whitesmoke/60">
              ${priceCents}
            </span>
            <span className="text-whitesmoke/60">|</span>
            <span>{durationMin} mins</span>
          </div>
        </div>

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
    </div>
  )
}
