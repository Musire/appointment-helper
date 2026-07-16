import { AuthProvider } from "@/context";
import { getCurrentUser } from "@/domains/identity/auth/session";
import { Header } from "@/features/tinker";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode
}

export default async function DashboardLayout ({ children }: Props) {

    const user = await getCurrentUser()

    if (!user || !user.role ) {
        redirect('/login')
    }

    return (
        <AuthProvider fetchedRole={user.role}>
            <main className="bg-background text-main w-screen h-dvh flex-col flex overflow-x-hidden px-6 lg:px-60 relative">
                <Header avatarUrl={user.avatarUrl} />
                <div className=" w-full flex flex-1 overflow-x-hidden scrollbar-none  pb-20" >
                    {children}
                </div>
            </main>
        </AuthProvider>
    );
}