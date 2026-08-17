import { formatCurrency } from "@/lib/utils/stringMutate";
import { Clock4, Tag } from "lucide-react";
import { serviceSchemaType } from "../validation/service.schema";


type Props = {
    data: serviceSchemaType
}

export default function ServiceCard ({ data }: Props) {
    return (
        <article className="p-6 card flex flex-col space-y-2 text-sm capitalize text-main">
            <h2 className="border-b-2 pb-2 border-adjust">{data.name}</h2>
            <span className="flex space-x-4 items-center mt-2 ml-4">
                <Tag strokeWidth={1} />
                <p className="">{formatCurrency(data.price)}</p>
            </span>
            <span className="flex space-x-4 items-center ml-4">
                <Clock4 strokeWidth={1} />
                <p className="">{`60 mins`}</p>
            </span>

        </article>
    );
}