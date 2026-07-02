import { getStoreContext } from "@/domains/store/data-loader";
import { OverviewPanel } from "@/features/admin-status/components";
import { ParamsType } from "@/lib/types";

export default async function StoreDetails ({ params }: ParamsType<{slug: string}>) {
  const { slug } = await (params)

  if (!slug) return null ;

  const { store, requirements } = await getStoreContext(slug)

  if (!store) return null;

  return (
    <div className="">
        <OverviewPanel {...{requirements}} status={store.status} />
    </div>
  );
}