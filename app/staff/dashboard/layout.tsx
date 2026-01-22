import { getCurrentUser } from "@/app/actions/auth.actions";
import { NotificationPanel, PanelNav } from "@/components/dashboards";
import { LogoutButton } from "@/components/UI/buttons";

export type StaffLayoutProps = {
    children: React.ReactNode
}

export default async function StaffLayout ({ children }: StaffLayoutProps) {
    const user = await getCurrentUser()

    const tabs = [
        { label: 'Overview', href: `/staff/dashboard`, index: true },
        { label: 'Stores', href: `/staff/dashboard/stores` },
        { label: 'Bookings', href: `/staff/dashboard/bookings` },
        { label: 'History', href: `/staff/dashboard/history` },
    ];
    return (
        <main className="page-layout relative">
            <div className="display-layout">
                <span className="flex justify-end">
                    <h1 className="text-3xl capitalize w-full text-center">staff dashboard</h1>
                    <NotificationPanel userId={user?.id ?? null} />
                    <LogoutButton />
                </span>
                <PanelNav items={tabs} />
                { children }
            </div>
        </main>
    );
}