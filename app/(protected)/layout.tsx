import { Navbar } from "@/components/ui";
import { AuthProvider } from "@/context";
import { getCurrentUser } from "@/domains/auth/auth.actions";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode
}

export default async function DashboardLayout ({ children }: Props) {

    const user = await getCurrentUser()

    if (!user || !user.role ) {
        redirect('/login')
    }


    const isAdmin = (user.user_metadata.role === 'admin')

    return (
        <AuthProvider fetchedRole={user.user_metadata.role.toUpperCase()}>
            <div className=" text-main relative flex flex-col flex-1 overflow-hidden ">
                {!isAdmin && <Navbar role={user.role} />}
                <div className=" flex  flex-1 overflow-x-hidden scrollbar-none pb-20 " >
                    {children}
                </div>
            </div>
        </AuthProvider>
);
}