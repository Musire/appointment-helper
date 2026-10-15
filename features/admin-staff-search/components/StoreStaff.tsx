import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs/Tab";
import { InviteDataType, StaffDataType } from "@/domains/invite/invite.types";
import { StaffInvite } from "@/features/admin-invite-staff/components";
import StaffSearch from "./StaffSearch";

type Props = {
  staffData: StaffDataType[];
  inviteData: InviteDataType
}

export default async function StoreStaff ({
    staffData,
    inviteData
}: Props) {
    
    return (
        <section className="p-6 flex-1 flex ">
            <Tabs defaultValue='search' className="" >
                <TabsList className="">
                    <TabsTrigger value={'search'}>
                        <p className="">search</p>
                    </TabsTrigger>
                    <TabsTrigger value={'invite'}>
                        <p className="">Invite</p>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="search" className="">
                    <StaffSearch data={staffData} />
                </TabsContent>
                <TabsContent value="invite">
                    <StaffInvite data={inviteData} />
                </TabsContent>
            </Tabs>
        </section>
    );
}