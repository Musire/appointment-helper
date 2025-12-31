
import { requireRole } from '@/lib/auth/requireRole';

export default async function UserLayout({ children}: { children: React.ReactNode }) {
    await requireRole(['USER'])
    return <>{children}</>
}
