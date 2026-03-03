'use client';

import { deleteStores } from "@/app/actions/admin.actions";
import { DeleteModal } from "@/components/UI";
import useSelectable from "@/hooks/useSelectable";
import { createExcerpt, slugify } from "@/lib/stringMutate";
import { useRouter } from "next/navigation";
import {
    ContinueButton,
    SelectableDisplay,
    StoreActionTray
} from ".";

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
                    <article 
                        className="w-full rounded-xl h-full spaced relative p-6 bg-darkest border-adjust">
                            <span className="">
                                <p className="text-2xl capitalize">{i.name}</p>
                                <p className="text-sm" >{createExcerpt(i.description, 60)}</p>
                            </span>
                            <button onClick={() => router.push(`/admin/store/${slugify(i.name)}`)} type="button" className="btn self-end justify-self-end">Check Details</button>
                    </article>
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