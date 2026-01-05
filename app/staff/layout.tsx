import { requireRole } from '@/lib/auth/requireRole';
import { redirect } from 'next/navigation';

export default async function StaffLayout({ children}: { children: React.ReactNode }) {
    const { access, user } = await requireRole(['STAFF'])

    if (!user || !access) {
        redirect("/unauthorized")
    }
    
    return <>{children}</>

}
