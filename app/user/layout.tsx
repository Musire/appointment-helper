import { requireRole } from '@/lib/auth/requireRole';
import { redirect } from 'next/navigation';

export default async function UserLayout({ children}: { children: React.ReactNode }) {
    const { access, user } = await requireRole(['USER'])

    if (!user || !access) {
        redirect("/unauthorized")
    }
    
    return <>{children}</>
}
