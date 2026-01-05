import { requireRole } from '@/lib/auth/requireRole';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children}: { children: React.ReactNode }) {
    const { access, user } = await requireRole(['ADMIN'])

    if (!user || !access) {
        redirect("/unauthorized")
    }
    
    return <>{children}</>
}
