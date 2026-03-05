import { BackButton, LogoutButton } from "@/components/UI/buttons";
import { getStoreContext } from "@/lib/store/data-loader";
import { unslugify } from "@/lib/stringMutate";
import StoreProvider from "@/stores/StoreContext";
import { PanelNav } from "@/app/staff/components";

type StoreDetailsProps = {
    params: {
        slug: string;
    },
    children: React.ReactNode
} 

export default async function StoreLayout ({ params, children }: StoreDetailsProps ) {
    const {slug} = await params


    const tabs = [
        { label: 'Overview', href: `/admin/store/${slug}`, index: true },
        { label: 'Hours', href: `/admin/store/${slug}/hours` },
        { label: 'Services', href: `/admin/store/${slug}/services` },
        { label: 'Staff', href: `/admin/store/${slug}/staff` },
    ];

    return (
        <div className="page-layout">
            <div className="display-layout">
                <span className="spaced">
                    <BackButton href="/admin/dashboard" />
                    <h2 className="capitalize">{unslugify(slug)}</h2>
                    <LogoutButton />
                </span>
                <PanelNav items={tabs} />
                <div className="grow flex ">
                    {children}
                </div>
            </div>
        </div>
  );
}