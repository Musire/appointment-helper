
import { requireRole } from '@/lib/auth/requireRole';

export default async function SuperadminLayout({ children}: { children: React.ReactNode }) {
    await requireRole(['SUPERADMIN'])
    return <>{children}</>
}
