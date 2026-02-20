import { Check } from "lucide-react";

type SelectableCardProps = {
  selected: boolean
  onSelect: () => void
  children: React.ReactNode
}

export function SelectableCard({
  selected,
  onSelect,
  children
}: SelectableCardProps) {
    const isSelected = selected 
        ? 'ring-whitesmoke/30 bg-darkest' 
        : 'ring-whitesmoke/15 hover:bg-deep';

  return (
    
    <li className={`ring-2 flex  relative  ${isSelected}`}>
        <button
            type="button"
            onClick={onSelect}
            className={` w-full text-left h-full hover:cursor-pointer p-6  ${isSelected}`}
        >
            {children}
        </button>
        <div className={`absolute size-6 right-6 top-1/2 -translate-y-1/2  rounded-full ring-2 ${selected ? "ring-alternate/50": "hidden"} centered`}>
            <Check size={20} className="text-alternate" />
        </div>
    </li>
  )
}
