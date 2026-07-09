
type Props = {
  storeId: string
}

export default async function AdminStoreDetails ({ storeId }: Props) {
    return (
        <div className="py-6 flex-1 ">
            storeDetails
            <p className="">{storeId}</p>
        </div>
    );
}