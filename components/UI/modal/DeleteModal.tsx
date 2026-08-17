'use client';
import { Modal } from "@/components/ui/modal";

interface DeleteModal {
    modalOpen: boolean,
    onClose: () => void,
    handleDeletion: () => void
}

export default function DeleteModal ({ modalOpen, onClose, handleDeletion }: DeleteModal ) {
  return (
    <Modal isOpen={modalOpen} onClose={onClose} title="Confirm Delete" >
        <div className="flex-col flex space-y-6">
        <h3 className="">Are you sure you want to delete the selected items, this change cannot be undone.</h3>
        <span className="flex space-x-2 self-end">
            <button
              onClick={onClose}
              type="button" 
              className="capitalize ring-2 ring-transparent active:bg-whitesmoke w-24  active:text-deep normal-space hover:cursor-pointer hover:ring-whitesmoke/30 rounded-full"
            >
            cancel
            </button>
            <button
              onClick={handleDeletion} 
              type="button" 
              className="capitalize text-error normal-space hover:bg-error w-24 hover:text-darker rounded-full hover:cursor-pointer"
            >
            delete
            </button>
        </span>
        </div>
    </Modal>
  );
}