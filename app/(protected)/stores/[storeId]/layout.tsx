import StoreProvider from "@/context/StoreContext";

type Props = {
  params: Promise<Record<string, string>>,
  children: React.ReactNode
}

export default async function StoreDetailsLayout ({ 
    params, 
    children 
}: Props) {
    const { storeId } = await params
    const data = { storeId }


    return (
        <div className="flex-1 flex ">
            <div className="flex-1  flex">
                <StoreProvider data={data}>
                    {children}
                </StoreProvider>
            </div>
        </div>
    );
}