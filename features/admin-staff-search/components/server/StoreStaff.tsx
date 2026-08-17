import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs/Tab";
import { StaffInvite } from "@/features/admin-invite-staff/components";
import { getInviteStatus } from "@/features/admin-invite-staff/queries/getInviteStatus";
import { getAvailableStaff } from "../../queries/getAvailableStaff";
import { StaffSearch } from "../client";


export default async function StoreStaff ({ storeId }: { storeId: string }) {
    const { data: staffData } = await getAvailableStaff(storeId)
    const { data : invitedata } = await getInviteStatus(storeId)

    if (!staffData || !invitedata) return <div className="">some error</div>
    
    return (
        <main className="py-6 flex-1 flex ">
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
                    <StaffInvite data={invitedata} />
                </TabsContent>
            </Tabs>
        </main>
    );
}