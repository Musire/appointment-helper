import { MobileNav, PanelNav } from "@/components/UI";
import StoreProvider from "@/context/StoreContext";
import { getServices } from "@/domains/service/queries/getServices";

type Props = {
  params: Promise<Record<string, string>>,
  children: React.ReactNode
}

export default async function StoreDetailsLayout ({ 
    params, 
    children 
}: Props) {
    const { storeId } = await params
    const { services, categories } = await getServices(storeId)
    const data = { storeId, services, categories }

    const tabs = [
        { 
            label: 'Overview', 
            href: `/stores/${storeId}`, 
            index: true 
        },
        { 
            label: 'Hours', 
            href: `/stores/${storeId}/hours` 
        },
        { 
            label: 'Services', 
            href: `/stores/${storeId}/services` 
        },
        { 
            label: 'Staff', 
            href: `/stores/${storeId}/staff` 
        },
    ]

    return (
        <div className="flex-1 flex ">
            <div className="md:w-full h-20  centered  xs:fixed xs:bottom-0 xs:left-6 md:static xs:w-[calc(100%-3rem)] " >
                <div className="xs:hidden md:block">
                    <PanelNav items={tabs} />
                </div>
                <div className="md:hidden w-full ">
                    <MobileNav items={tabs} />
                </div>
            </div>
            <div className="flex-1  flex">
                <StoreProvider data={data}>
                    {children}
                </StoreProvider>
            </div>
        </div>
    );
}