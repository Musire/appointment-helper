import { Store } from "@/generated/prisma";
import Link from "next/link";

type props = {
    store: Store
}

export default function StoreCard ({ store }: props) {
    const { id, name, description } = store
    return (
        <li className="surface-1 ">
            <article className=" p-4 stacked">
                <span className="flex flex-col space-y-2">
                    <p className="text-lg capitalize text-main">{name}</p>
                    <p className="text-else">{description}</p>
                </span>
                <span className="spaced">
                    <Link href={`stores/${id}`} className="px-2 py-1 centered border border-border bg-surface-2 ml-auto hover:bg-surface-4 active:bg-surface-3">
                        Update
                    </Link>
                </span>
            </article>
        </li>
    );
}