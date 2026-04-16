import { Header, Navbar } from "@/domains/tinker";
import { getCurrentUser } from "@/lib/auth/session";

type Props = {
    children: React.ReactNode
    params: Promise<{
        slug: string
    }>
}

export default async function UserLayout ({ children, params }: Props) {
    const {slug} = await params
    const user = await getCurrentUser()

    if (!user || !user.role ) return null;

    return (
        <main className="bg-background text-main w-screen h-dvh flex-col flex overflow-x-hidden px-6 lg:px-60 relative">
            <Header avatarUrl={user.avatarUrl} />
            <Navbar slug={slug} role={user.role} />
            <div className="max-h-[calc(100%-7rem)] w-full flex-1 overflow-x-hidden overflow-y-scroll scrollbar-none" >
                {children}
            </div>
        </main>
    );
}
