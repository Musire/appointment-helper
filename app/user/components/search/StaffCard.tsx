export type StaffBrief = {
    id: string;
    fullName: string | null;
    email: string;
    bio: string | null;
}

type StaffCardProps = {
    data: StaffBrief;
    selected: boolean;
    onSelect: () => void;
}

export function StaffCard ({ data, selected, onSelect }: StaffCardProps) {
    const { fullName } = data
    return (
        <li
            onClick={onSelect}
            className={`p-3 cursor-pointer rounded ring-2 
                ${selected ? "ring-whitesmoke/30" : "ring-transparent"}
            `}
        >
            { fullName }
        </li>
    );
}