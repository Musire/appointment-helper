import { ServiceType } from "@/lib/helpers/groupArrays";
import { formatCurrency } from "@/lib/stringMutate";
import { Clock4, SquareScissors, Tag } from "lucide-react";


type Props = {
    data: ServiceType
}

export default function ServiceCard ({ data }: Props) {
    return (
        <article className="p-6 card flex flex-col space-y-2 text-sm capitalize text-main">
            <h2 className="border-b-2 pb-2 border-adjust">{data.name}</h2>
            <span className="flex space-x-4 items-center mt-2 ml-4">
                <Tag strokeWidth={1} />
                <p className="">{formatCurrency(data.priceCents)}</p>
            </span>
            <span className="flex space-x-4 items-center ml-4">
                <Clock4 strokeWidth={1} />
                <p className="">{`${data.durationMin} mins`}</p>
            </span>
            <span className="flex space-x-4 items-center ml-4">
                <SquareScissors strokeWidth={1} />
                <p className="">{data.type}</p>
            </span>
        </article>
    );
}