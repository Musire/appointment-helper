'use client';

type Props = {
    isActive: boolean;
    value: string;
    onSelect: () => void;
}

export default function FilterChip ({
    isActive,
    value,
    onSelect
}: Props) {
    const activeStyle = "bg-surface-2"
    const inactiveStyle = ""
    const styling = isActive ? activeStyle : inactiveStyle
    
    return (
        <li onClick={onSelect} className={`centered rounded-full normal-space w-24 ${styling}`}>{value}</li>
    )
}
