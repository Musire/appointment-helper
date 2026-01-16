import { StoreType } from "@/app/admin/dashboard/page";
import { slugify } from "@/lib/stringMutate";
import Link from "next/link";

export default function StoreCard ({ store }: { store: StoreType}) {
  const { name, description, status } = store 
  return (
    <li className="bg-dark w-full max-h-48 flex-1 grow min-h-48 p-4 relative">
      <Link
        href={`/admin/store/${slugify(name)}`}
        className="w-full h-full flex flex-col space-y-6 "
      >
        <p className="capitalize text-2xl">{name}</p>
        <p className="text-lg text-whitesmoke/60 ml-6">{description}</p>
        <p className="normal-space centered bg-whitesmoke/37 rounded-full w-24 absolute right-4 top-4">{status}</p>
      </Link>
    </li>
  );
}