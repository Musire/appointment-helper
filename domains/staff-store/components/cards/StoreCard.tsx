import { Store } from "@/generated/prisma";
import Link from "next/link";

type props = {
    store: Store
}

export default function StoreCard ({ store }: props) {
    const { id, name, description } = store
    return (
        <li className="">
            <article className="bg-darkest p-6 flex-col flex space-y-2">
                <p className="text-lg capitalize text-whitesmoke/87">{name}</p>
                <p className="text-whitesmoke/60">{description}</p>
                <Link href={`stores/${id}`} className="btn self-end">
                    update availability
                </Link>
            </article>
        </li>
    );
}