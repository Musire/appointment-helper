import { getNav, MobileNav, PanelNav, Role } from "@/components/ui";

type Props = {
    role: Role
}

export default function Navbar ({ role }: Props) {

    const tabs = getNav(role)

    return (
        <div className="md:w-full h-20  centered  xs:fixed xs:bottom-0 xs:left-6 md:static xs:w-[calc(100%-3rem)] " >
            <div className="xs:max-md:hidden">
                <PanelNav items={tabs} />
            </div>
            <div className="md:hidden w-full ">
                <MobileNav items={tabs} />
            </div>
        </div>
    );
}