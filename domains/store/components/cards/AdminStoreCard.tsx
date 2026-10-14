import { BodySm } from "@/components/ui";
import { createExcerpt } from "@/lib/utils/stringMutate";
import { MapPin } from "lucide-react";

type Props = {
  data: any
}

export default function AdminStoreCard ({ data }: Props) {
    return (
        <article 
            className="
                h-fit w-full p-6 rounded-xl 
                relative stacked space-y-4 cursor-pointer
                bg-surface-1 border border-adjust opacity-80 hover:opacity-90 active:opacity-100"
            >
                <p className="text-xl capitalize">{data.name}</p>
                <div className="flex space-x-2 text-else  h-12">
                        <MapPin strokeWidth={1} />
                        <p className="text-sm" >
                            {createExcerpt(data.address, 60)}
                        </p>
                </div>
                <BodySm className="self-end text-alternate text-xs">Created: July 10, 2026</BodySm> 
        </article>
    );
}