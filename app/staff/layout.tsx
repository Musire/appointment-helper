
import { requireRole } from '@/lib/auth/requireRole';

export default async function StaffLayout({ children}: { children: React.ReactNode }) {
    await requireRole(['STAFF'])
    return <>{children}</>
}
