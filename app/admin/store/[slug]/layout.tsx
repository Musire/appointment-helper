
import { PanelNav } from "@/components/dashboards";
import { getStoreContext } from "@/lib/store/data-loader";
import StoreProvider from "@/stores/StoreContext";

type StoreDetailsProps = {
    params: {
        slug: string;
    },
    children: React.ReactNode
} 

export default async function StoreLayout ({ params, children }: StoreDetailsProps ) {
    const {slug} = await params
    const ctx = await getStoreContext(slug)

    if (!ctx) {
        return <p className="">no store found</p>
    }

    const tabs = [
        { label: 'Overview', href: `/admin/store/${slug}`, index: true },
        { label: 'Config', href: `/admin/store/${slug}/config` },
        { label: 'Services', href: `/admin/store/${slug}/services` },
        { label: 'Staff', href: `/admin/store/${slug}/staff` },
    ];

    return (
        <div className="page-layout">
            <div className="display-layout">
                <h1 className="">Store Details</h1>
                <h2 className="">{slug}</h2>
                <PanelNav items={tabs} />
                <StoreProvider data={ctx} >
                    { children }
                </StoreProvider>
            </div>
        </div>
  );
}