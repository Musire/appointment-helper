'use client';

import { BodySm, DeleteModal } from "@/components/UI";
import { deleteStores } from "@/domains/store/actions/admin.actions";
import useSelectable from "@/hooks/useSelectable";
import { createExcerpt } from "@/lib/utils/stringMutate";
import { useRouter } from "next/navigation";
import {
    ContinueButton,
    SelectableDisplay,
    StoreActionTray
} from ".";
import { MapPin } from "lucide-react";

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
                renderItem={(i) => (
                    <article 
                        className="w-full rounded-xl h-fit stacked relative p-6 bg-surface-1 hover:cursor-pointer border-adjust border opacity-80 hover:opacity-90 active:opacity-100">
                            <div className="">
                                <p className="text-2xl capitalize">{i.name}</p>
                                <span className="flex items-center space-x-2 text-else ">
                                    <MapPin strokeWidth={1} />
                                    <p className="text-sm" >
                                        {createExcerpt(i.description, 60)}
                                    </p>
                                </span>
                            </div>
                            <BodySm className="self-end text-alternate">Created: July 10, 2026</BodySm> 
                    </article>
                )}
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
                setModal={setModal}
                handleDeletion={handleDeletion} 
            />
        </div>
    );
}