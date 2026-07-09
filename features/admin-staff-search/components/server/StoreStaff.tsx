import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs/Tab";
import { getAvailableStaff } from "../../queries/getAvailableStaff";

type Props = {
  storeId: string;
}

export default async function StoreStaff ({ storeId }: Props) {
    const { data, success, error } = await getAvailableStaff(storeId)
    console.log(success, data, error)

    if (!data) return <div className="">some error</div>
    
    return (
        <main className="py-6 flex-1 flex ">
            {/* <StaffSearch data={data} /> */}
            <Tabs defaultValue='invite' className="" >
                <TabsList className="">
                    <TabsTrigger value={'search'}>
                        <p className="">search</p>
                    </TabsTrigger>
                    <TabsTrigger value={'invite'}>
                        <p className="">Invite</p>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="search" className="">
                    <p className="">i am search mein</p>
                </TabsContent>
                <TabsContent value="invite">
                    <p className="">i am invite yo</p>
                </TabsContent>
            </Tabs>
        </main>
    );
}