import { Store } from "@/generated/prisma";
import Link from "next/link";

type props = {
    store: Store
}

export default function StoreCard ({ store }: props) {
    const { id, name, description } = store
    return (
        <li className="">
            <article className="card p-6 spaced">
                <span className="flex flex-col space-y-2">
                    <p className="text-lg capitalize text-whitesmoke/87">{name}</p>
                    <p className="text-whitesmoke/60">{description}</p>
                </span>
                <Link href={`stores/${id}`} className="btn border-0 bg-darker">
                    Update
                </Link>
            </article>
        </li>
    );
}