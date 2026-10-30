import { getStoreAvailability } from "@/domains/availability/availability.queries";
import { convertToTimeBlocks } from "@/domains/availability/availability.utils";
import StaffStoreAvailibility from "./StaffStoreAvailibility";

type Props = {
  storeId: string
}

export default async function StoreAvailabilityDataLayer({ storeId }: Props) {
    const { data: availability } = await getStoreAvailability({ storeId })

    if (!availability?.storeStaffId) {
        return (
            <section className="flex-1 centered">
                <p className="">No store profile found</p>
            </section>
        )
    }

    const data = availability.records ? convertToTimeBlocks(availability.records) : []

    return (
        <StaffStoreAvailibility storeStaffId={availability.storeStaffId} data={data} />
    );
}
