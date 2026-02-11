import { requireRole } from '@/lib/auth/requireRole';
import { redirect } from 'next/navigation';
import { PanelNav } from "@/app/staff/components";
import { PageHeader } from "@/components/UI";


export default async function UserLayout({ children}: { children: React.ReactNode }) {
    const { access, user } = await requireRole(['USER'])

    if (!user || !access) {
        redirect("/unauthorized")
    }
    
    return (
        <main className="page-layout relative">
            <div className="display-layout">
                <PageHeader title="user dashboard" />
                <PanelNav items={[]} />
                { children } 
            </div>
        </main> 
    )
}
