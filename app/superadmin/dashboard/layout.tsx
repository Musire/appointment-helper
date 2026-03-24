import { Header, Navbar } from "@/domains/tinker";
import { getCurrentUserRole } from "@/lib/auth/session";

type Props = {
    children: React.ReactNode
    params: Promise<{
        slug: string
    }>
}

export default async function DashboardLayout ({ children, params }: Props) {
    const {slug} = await params
    const role = await getCurrentUserRole()

    if (!role) return null;

    return (
        <main className="bg-deep text-main w-screen h-dvh flex-col flex overflow-x-hidden px-6 lg:px-60 relative">
            <Header />
            <Navbar slug={slug} role={role} />
            <div className="max-h-[calc(100%-7rem)] w-full flex-1 overflow-x-hidden overflow-y-scroll scrollbar-none" >
                {children}
            </div>
        </main>
    );
}