import { getNav, MobileNav, PanelNav, Role } from "@/components/UI";

type Props = {
    slug: string;
    role: Role
}

export default function Navbar ({ slug, role }: Props) {

    const tabs = getNav(role, slug)

    return (
        <div className="md:w-full h-20  centered  xs:fixed xs:bottom-0 xs:left-6 md:static xs:w-[calc(100%-3rem)] " >
            <div className="xs:hidden md:block">
                <PanelNav items={tabs} />
            </div>
            <div className="md:hidden w-full ">
                <MobileNav items={tabs} />
            </div>
        </div>
    );
}