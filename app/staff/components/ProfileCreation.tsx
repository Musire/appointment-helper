'use client';
import { ProfileCreationForm } from "@/components/forms";
import { Modal } from "@/components/UI";
import { useDrawer } from "@/hooks";

export default function ProfileCreation ({ profile }: { profile: boolean | null}) {
    const {
        isMounted,
        animation,
        openDrawer,
        closeDrawer,
        toggleDrawer,
    } = useDrawer()


    return (
        <>
            { !profile && (
                <>
                <div className="absolute -top-16 w-full h-[85dvh] bg-black/60 centered-col space-y-6">
                    <p className="">You dont have a staff profile set up yet</p>
                    <button onClick={openDrawer} type="button" className="btn">+ Profile</button>
                </div>
                <Modal 
                    title='profile creation'
                    isOpen={isMounted}
                    onClose={closeDrawer}
                >
                    <ProfileCreationForm data={{bio: ''}} onClose={closeDrawer} />
                </Modal>
                </>
            )}
        </>
    );
}