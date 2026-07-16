import { ContainerMode } from "@/hooks/useSelectable";
import { cn } from "@/lib/utils";
import SelectableCard from "./SelectableCard";

interface CardDisplayProps<T> {
  items: T[];
  mode: ContainerMode;
  selected: string[];
  getId: (item: T) => string;
  onSelect: (id: string) => void;
  onNavigate?: (id: string) => void;
  renderItem?: (item: T) => React.ReactNode;
  emptyText?: string;
  className?: string;
}

export default function SelectableDisplay<T>({
  items,
  mode,
  selected,
  getId,
  onSelect,
  onNavigate,
  renderItem,
  emptyText = "No items found",
  className
}: CardDisplayProps<T>) {
  if (items.length === 0) {
    return (
      <ul className="w-full flex-1 grid place-items-center">
        <li>
          <p className="opacity-60">{emptyText}</p>
        </li>
      </ul>
    );
  }

  return (
    <ul className={cn('w-full flex-1 grid xs:grid-cols-1 md:grid-cols-3 gap-4 overflow-y-scroll scrollbar-none p-2', className)}>
      {items.map(item => {
        const id = getId(item);

        return (
          <SelectableCard
            key={id}
            id={id}
            mode={mode}
            isSelected={selected.includes(id)}
            onSelect={onSelect}
            onNavigate={onNavigate ? () => onNavigate(id) : undefined}
          >
            {renderItem ? renderItem(item) : <p>{String(item)}</p>}
          </SelectableCard>
        );
      })}
    </ul>
  );
}
