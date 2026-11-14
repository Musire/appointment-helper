import { Store } from "@/generated/prisma";
import { Store as Icon } from "lucide-react";

type StoreSlotProps = {
    store: Store
}

export default function StoreSlot ({ store }: StoreSlotProps) {
    return (
        <li className="flex items-center space-x-6 w-full pb-4">
            <Icon size={30} strokeWidth={1} />
            <span className="spaced w-full">
                <p className="capitalize">{store.name}</p>
                <p className="text-else">{store.address}</p>
            </span>
            
        </li>
    );
}