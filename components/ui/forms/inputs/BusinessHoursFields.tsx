import { TimeBlock } from "@/domains/offering/offering.types";
import { TimeBlockCard } from "@/features/hour-selection/components";
import { DEFAULT_BLOCK } from "@/features/hour-selection/components/BusinessHoursForm";
import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../../buttons";

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
      <Button
        type="button"
        onClick={addBlock}
        className="centered size-10"
      >
        <Plus />
      </Button>

      <div className="stacked space-y-2 pr-4 overflow-y-auto scrollbar-adjust">
        {fields.map((block, index) => (
          <TimeBlockCard
            key={block.id}
            index={index}
            onDelete={() => remove(index)}
          />
        ))}
      </div>
    </>
  );
}