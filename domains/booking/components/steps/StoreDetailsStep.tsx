import { ConfigTable } from "@/app/admin/store/[slug]/config/components";
import { StoreConfig } from "@/generated/prisma";
import { useFetch } from "@/hooks";
import { ContinueButton, Header, Indicator } from "../page";

type StoreDetailsProps = {
    store: string;
    staffStore: string;
    steps: string[];
    onBack: () => void;
    onChange: () => void;
}

export default function StoreDetailsStep ({ store, staffStore, steps, onBack, onChange }: StoreDetailsProps) {
    
    const id = store || staffStore

    const { status, error, data } = useFetch<StoreConfig>(
        id ? '/api/storeDetails' : null,
        {
            method: 'POST',
            body: { storeId: id }
        }
    )

    return (
        <>  
            <Header onBack={onBack} title="store details" />
            <Indicator steps={steps} index={(!!store) ? 2 : 4} />
            { data && <ConfigTable config={data} />}
            <ContinueButton onContinue={onChange} />
        </>
    );
}