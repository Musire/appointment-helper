
type Service = {
    id: string;
    name: string;
}

type ServiceCardProps = {
    item: Service;
    selected: boolean;
    onSelect: () => void;
}

export default function ServiceCard ({ item, selected, onSelect }: ServiceCardProps) {
    return (
        <li 
            onClick={onSelect}
            className={`ring-2 hover:cursor-pointer ${selected ? 'ring-whitesmoke/30' : 'ring-transparent'}`}
        >
            {item.name}
        </li>
    );
}