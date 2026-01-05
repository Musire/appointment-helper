import { requireRole } from '@/lib/auth/requireRole';
import { redirect } from 'next/navigation';

export default async function SuperadminLayout({ children}: { children: React.ReactNode }) {
    const { access, user } = await requireRole(['SUPERADMIN'])

    if (!user || !access) {
        redirect("/unauthorized")
    }
    
    return <>{children}</>
}
