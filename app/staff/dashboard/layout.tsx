import { PanelNav } from "@/components/dashboards";
import { LogoutButton } from "@/components/UI/buttons";

export type StaffLayoutProps = {
    children: React.ReactNode
}

export default function StaffLayout ({ children }: StaffLayoutProps) {
    const slug = 'street'
    const tabs = [
        { label: 'Overview', href: `/staff/dashboard`, index: true },
        { label: 'Availability', href: `/staff/dashboard/availability` },
        { label: 'Bookings', href: `/staff/dashboard/bookings` },
        { label: 'History', href: `/staff/dashboard/history` },
    ];
    return (
        <main className="page-layout">
            <div className="display-layout">
                <span className="flex justify-end">
                    <h1 className="text-3xl capitalize w-full text-center">staff dashboard</h1>
                    <LogoutButton />
                </span>
                <PanelNav items={tabs} />
                { children }
            </div>
        </main>
    );
}