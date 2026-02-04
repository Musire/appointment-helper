export type StoreBrief = {
    id: string;
    name: string;
    description: string | null;
}

type StoreCardProps = {
    data: StoreBrief;
    selected: boolean;
    onSelect: () => void;
}

export default function StoreCard ({ data, selected, onSelect }: StoreCardProps) {
    const { name } = data
    return (
        <li
            onClick={onSelect}
            className={`p-3 cursor-pointer rounded ring-2 
                ${selected ? "ring-whitesmoke/30" : "ring-transparent"}
            `}
        >
            {name}
        </li>
    );
}