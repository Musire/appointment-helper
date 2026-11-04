import AdminHourForm from "./AdminHourForm";

type Props = {
  storeId: string
}

export default function AdminHourDataLayer ({ storeId }: Props) {
    return (
        <div className="flex flex-1">
            <AdminHourForm storeId={storeId} />
        </div>
    );
}