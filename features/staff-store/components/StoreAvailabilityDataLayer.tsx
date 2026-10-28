import StaffStoreAvailibility from "./StaffStoreAvailibility";

type Props = {
  storeId: string
}

export default function StoreAvailabilityDataLayer ({ storeId }: Props) {
    return (
        <StaffStoreAvailibility />
    );
}