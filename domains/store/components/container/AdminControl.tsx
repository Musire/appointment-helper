'use client';

import { DeleteModal } from "@/components/ui";
import { deleteStores } from "@/domains/store/actions/admin.actions";
import useSelectable from "@/hooks/useSelectable";
import { useRouter } from "next/navigation";
import {
    ContinueButton,
    SelectableDisplay,
    StoreActionTray
} from ".";
import AdminStoreCard from "../cards/AdminStoreCard";

export default function AdminControl ({ items }: { items: any }) {
    const { 
        mode, 
        selected,
        setSelected,
        modalOpen, 
        changeMode, 
        handleSelect, 
        setModal } = useSelectable()

    const router = useRouter()

    const handleDeletion = async () => {
        const { success, error } = await deleteStores(selected)

        if (!success) {
            alert(error)
            return;
        }

        setSelected([])
        setModal(false)
        changeMode('view')
        router.refresh()
    }

    return (
        <div className="flex-1 stacked ">
            <StoreActionTray 
                mode={mode}
                onModeChange={changeMode}
                resourceBasePath="/stores"
            />
            <SelectableDisplay
                className="xs:grid-cols-2"
                items={items}
                mode={mode}
                selected={selected}
                getId={(item: any) => item.id}
                onSelect={handleSelect}
                onNavigate={(id:string) => router.push(`/stores/${id}`)}
                renderItem={(i) => <AdminStoreCard data={i} />  }
            />
            <ContinueButton 
                mode={mode} 
                hasSelection={selected.length > 0}
                onDelete={() => setModal(true)}
                selected={selected}
                base='stores'
            />
            <DeleteModal 
                modalOpen={modalOpen}
                onClose={() => setModal(false)}
                handleDeletion={handleDeletion} 
            />
        </div>
    );
}