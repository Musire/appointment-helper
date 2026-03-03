import { OverviewPanel } from "@/domains/staff-overview";
import { ParamsType } from "@/lib/queries/types";
import { getStoreContext } from "@/lib/store/data-loader";

export default async function StoreDetails ({ params }: ParamsType) {
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