import { Navbar } from "@/components/ui";
import { AuthProvider } from "@/context";
import { ToastProvider } from "@/context/ToastContext";
import { getCurrentUserFull } from "@/domains/auth/util/session";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode
}

export default async function DashboardLayout ({ children }: Props) {

    const user = await getCurrentUserFull()

    if (!user || !user.role ) {
        redirect('/login')
    }


    const isAdmin = (user.user_metadata.role === 'admin')
    const role = user.user_metadata.role.toUpperCase()

    return (
        <ToastProvider >
            <AuthProvider fetchedRole={role}>
                <div className=" text-main relative flex flex-col flex-1 overflow-hidden ">
                    {!isAdmin && <Navbar role={role} />}
                    <div className=" flex  flex-1 overflow-x-hidden scrollbar-none pb-20 " >
                        {children}
                    </div>
                </div>
            </AuthProvider>
        </ToastProvider>
);
}