import { TimeBlock } from "@/domains/offering/offering.types";
import { TimeBlockCard } from "@/features/hour-selection/components";
import { DEFAULT_BLOCK } from "@/features/hour-selection/components/BusinessHoursForm";
import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function BusinessHoursFields() {
  const { control } = useFormContext<{ blocks: TimeBlock[] }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'blocks',
  });

  function addBlock() {
    append(DEFAULT_BLOCK());
  }

  return (
    <>
      <div className="stacked w-full space-y-2 overflow-y-auto scrollbar-adjust">
        {fields.map((block, index) => (
          <TimeBlockCard
            key={block.id}
            index={index}
            onDelete={() => remove(index)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={addBlock}
        className="centered w-full border-border border space-x-2 normal-space rounded-md cursor-pointer hover:bg-surface-1"
      >
        <Plus />
        <span className="">Agregar otro bloque</span>
      </button>
    </>
  );
}