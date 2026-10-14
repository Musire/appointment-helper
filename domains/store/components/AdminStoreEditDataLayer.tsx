import { getStoreDetails } from "@/domains/store/store.queries";
import AdminStoreEdit from "./AdminStoreEdit";

type Props = {
  params: Promise<{
    storeId: string
  }>
}

export default async function AdminStoreEditDataLayer ({ params }: Props) {
    const { storeId } = await params
    const { data: store } = await getStoreDetails({ storeId })
    console.log('storeId:',storeId)
    console.log('store:',store)

    if (!store) return (
      <section className="flex-1 centered">
        <p className="">not found or error</p>
      </section>
    );

    return (
        <AdminStoreEdit store={store} />
    );
}




