'use client';

import { OptionType } from "./PoolPage";


type Props = {
    isActive: boolean;
    value: OptionType;
    onSelect: () => void;
}

const FilterConfig:Record<OptionType, string> = {
    all: "Todo",
    pending: "Pendiente",
    checkedin: "Checkin",
    inprogress: "En Progreso",
    completed: "Finalizado",
    cancelled: "Cancelado",
    noshow: "No Llego",
}

export default function FilterChip ({
    isActive,
    value,
    onSelect
}: Props) {
    const activeStyle = "bg-surface-2"
    const inactiveStyle = ""
    const styling = isActive ? activeStyle : inactiveStyle

    const  label = FilterConfig[value]
    
    return (
        <li >
            <button 
                type="button" 
                onClick={onSelect} 
                className={`centered rounded-full normal-space w-28 shrink-0 hover:cursor-pointer hover:bg-surface-1 active:bg-surface-3 text-sm text-main ${styling}`}
            >
                {label}
            </button>
        </li>
    )
}
