import { getStoreHours } from "@/domains/store/store.queries";
import { consolidateToTimeBlocks } from "@/domains/store/store.utilities";
import AdminHourForm from "./AdminHourForm";

type Props = {
  storeId: string
}

export default async function AdminHourDataLayer ({ storeId }: Props) {

    const { data: hours } = await getStoreHours({ storeId })
    const consolidated = hours ? consolidateToTimeBlocks(hours) : []

    return (
        <div className="flex flex-1">
            <AdminHourForm initialBlocks={consolidated} storeId={storeId} />
        </div>
    );
}