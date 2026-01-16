'use client';

import { StoreCreationForm } from "@/components/forms";
import { Modal } from "@/components/UI";
import { useDrawer } from "@/hooks";

export default function CreateStoreButton () {
  const { 
    isMounted,
    openDrawer,
    closeDrawer} = useDrawer()

  return (
    <>
      <button 
          type="button" 
          className=""
          onClick={openDrawer}
      >
          create store
      </button>
      <Modal
          title="create store"
          isOpen={isMounted}
          onClose={closeDrawer}
      >
        <StoreCreationForm 
          onClose={closeDrawer} 
        />
      </Modal>
    </>
  );
}