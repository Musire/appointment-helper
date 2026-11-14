import { CirclePlus } from 'lucide-react';

export default function CustomerNotes() {
  return (
    <div className="bg-surface-1 p-6 stacked rounded-lg">
      <p>Customer Notes</p>

      <p className="spaced w-full">
        <span className="text-else text-sm">
          No notes added
        </span>

        <button
          type="button"
          className="cursor-pointer flex space-x-2 items-center"
        >
          <CirclePlus />
          <span>Add Note</span>
        </button>
      </p>
    </div>
  );
}