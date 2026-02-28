import { PanelNav } from "@/app/staff/components";
import { PageHeader } from "@/components/UI";
import { requireRole } from '@/lib/auth/requireRole';
import { redirect } from 'next/navigation';


export default async function UserLayout({ children}: { children: React.ReactNode }) {
    const { access, user } = await requireRole(['USER'])

    if (!user || !access) {
        redirect("/unauthorized")
    }

    const tabs = [
        { label: 'Upcoming', href: `/user/dashboard`, index: true },
        { label: 'History', href: `/user/dashboard/history` },
        { label: 'Profile', href: `/user/dashboard/profile` },
    ];
    
    return (
        <main className="page-layout relative">
            <div className="display-layout">
                <PageHeader title="user dashboard" />
                <PanelNav items={tabs} />
                { children } 
            </div>
        </main> 
    )
}
