import { PanelNav } from "@/app/staff/components";
import { PageHeader } from "@/components/UI";

export type UserLayoutProps = {
    children: React.ReactNode
}

export default async function UserLayout ({ children }: UserLayoutProps) {

    const tabs = [
        { label: 'overview', href: `/user/dashboard`, index: true },
    ];
    return (
        <main className="page-layout relative">
            <div className="display-layout">
                <PageHeader title="user dashboard" />
                <PanelNav items={tabs} />
                { children } 
            </div>
        </main>
    );
}