import { Header, Navbar } from "@/features/tinker";
import { getCurrentUser } from "@/lib/auth/session";
import { AuthProvider } from "@/providers";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode
    params: Promise<{
        slug: string
    }>
}

export default async function DashboardLayout ({ children, params }: Props) {

    const {slug} = await params
    const user = await getCurrentUser()

    if (!user || !user.role ) {
        redirect('/login')
    }

    return (
        <AuthProvider fetchedRole={user.role}>
            <main className="bg-background text-main w-screen h-dvh flex-col flex overflow-x-hidden px-6 lg:px-60 relative">
                <Header avatarUrl={user.avatarUrl} />
                <Navbar slug={slug} role={user.role} />
                <div className=" w-full flex flex-1 overflow-x-hidden scrollbar-none  pb-20" >
                    {children}
                </div>
            </main>
        </AuthProvider>
    );
}