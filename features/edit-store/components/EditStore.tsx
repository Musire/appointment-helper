import StoreUpdateForm from "@/components/forms/StoreUpdateForm";
import { BackButton } from "@/components/ui/buttons";
import { getStoreDetails } from "@/domains/store/store.queries";

type Props = {
  params: Promise<{ slug: string }>
}

export default async function EditStore ({ params }: Props) {

  const { slug } = await params
  const { data: store } = await getStoreDetails({ storeId: slug })

  if (!store) return null

  return (
    <div className="page-layout">
        <div className="display-layout items-center">
            <span className="w-full spaced">
              <BackButton />
              <h1 className="">edit page</h1>
            </span>
            <div className="flex-col flex items-center mt-10 space-y-6 ">
              <StoreUpdateForm data={store} />
            </div>
        </div>
    </div>
  );
}