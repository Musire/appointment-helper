'use client';

import { createExcerpt, slugify } from "@/lib/stringMutate";
import { deleteStores } from "@/app/actions/admin.actions";
import useSelectable from "@/hooks/useSelectable";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ContinueButton,
    StoreActionTray,
    SelectableDisplay
} from "../components"
import { DeleteModal } from "@/components/UI";

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
        <div className="">
            <StoreActionTray 
                mode={mode}
                onModeChange={changeMode}
                resourceBasePath="/admin/store/"
            />
            <SelectableDisplay 
                items={items}
                mode={mode}
                selected={selected}
                getId={(item: any) => item.id}
                onSelect={handleSelect}
                renderItem={(i) => (
                    <Link 
                        href={'/admin/store/' + slugify(i.name)}
                        className="w-full rounded-xl h-full px-3 py-2 flex flex-col space-y-2 relative">
                        <p className="text-2xl capitalize">{i.name}</p>
                        <p className="text-sm" >{createExcerpt(i.description, 60)}</p>
                    </Link>
                )}
            />
            <ContinueButton 
                mode={mode} 
                hasSelection={selected.length > 0}
                onDelete={() => setModal(true)}
                selected={selected}
                base='store'
            />
            <DeleteModal 
                modalOpen={modalOpen}
                setModal={setModal}
                handleDeletion={handleDeletion} 
            />
        </div>
    );
}