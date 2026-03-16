import { Store } from "@/generated/prisma";
import { Store as Icon } from "lucide-react";

type StoreSlotProps = {
    store: Store
}

export default function StoreSlot ({ store }: StoreSlotProps) {
    return (
        <li className="flex items-center space-x-6 w-72">
            <Icon size={30} strokeWidth={1} />
            <span className="">
                <p className="capitalize">{store.name}</p>
                <p className="">{store.description}</p>
            </span>
            
        </li>
    );
}