import { PanelNav } from "@/components/dashboards/client";
import { prisma } from "@/lib/prisma";
import { getStoreActivationState } from "@/lib/store/store-activation";
import { unslugify } from "@/lib/utils";
import StoreProvider from "@/stores/StoreContext";

type StoreDetailsProps = {
    params: {
        slug: string;
    },
    children: React.ReactNode
} 

export default async function StoreLayout ({ params, children }: StoreDetailsProps ) {
    const {slug} = await params

    const store = await prisma.store.findFirst({
        where: {
            name: unslugify(slug)
        },
        include: {
            createdBy: {
                select: {
                    email: true
                }
            }
        }
    })

    const activation = await getStoreActivationState(store?.id)

    if (!store) {
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
                <StoreProvider store={store} activation={activation} >
                    { children }
                </StoreProvider>
            </div>
        </div>
  );
}