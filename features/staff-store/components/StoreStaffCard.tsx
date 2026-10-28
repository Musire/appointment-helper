import Link from "next/link";

type StoreStaff = {
    id: string;
    name: string
}

type Props = {
  storeStaff: StoreStaff
}

export default function StoreStaffCard ({ storeStaff }: Props) {
    return (
        <Link href={`/stores/${storeStaff.id}/availibility`} className="">
            <p className="">{storeStaff.name}</p>
        </Link>
    );
}