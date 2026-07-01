import { Store } from "@/generated/prisma";
import { MapPin } from "lucide-react";
import Image from "next/image";

type StoreSlotProps = {
    store: Store
}

export default function StoreCard ({ store }: StoreSlotProps) {
    return (
        <li className="flex snap-center touch-pan-x items-center space-x-6 shrink-0 rounded-xl relative w-full h-full ">
            <Image 
                src={'/haircut.jpeg'}
                alt={`store-image-${store.id}`}
                fill
                className="object-cover rounded-xl"
            />
            <div className="stacked space-y-1 rounded-xl w-[85%] bg-deep p-4 absolute bottom-4 left-1/2 -translate-x-1/2" >
                <p className="text-main capitalize text-sm">{store.name}</p>
                <span className="flex items-center space-x-2 text-else">
                    <MapPin size={15} strokeWidth={1.5} />
                    <p className=" text-xs">{store.description}</p>
                </span>
            </div>
        </li>
    );
}