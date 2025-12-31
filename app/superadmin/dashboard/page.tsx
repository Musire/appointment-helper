'use client';

import { logout } from "@/app/actions/auth.actions"
import { InviteAdminForm } from "@/components/forms";
import { Modal } from "@/components/UI/modal";
import { useState } from "react";

export default function SuperuserDashboard () {

  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <main className="page-layout">
        <div className="display-layout py-6">
            <h1 className="text-3xl capitalize w-full text-center">superadmin dashboard</h1>
            <button onClick={logout} className="hover:bg-whitesmoke/37 w-24 normal-space">logout</button>
            <button onClick={handleOpen} type="button" className="hover:bg-whitesmoke/37 w-40 normal-space">invite admin</button>
            <Modal
              title="invite admin"
              isOpen={isOpen}
              onClose={handleClose}
            >
              <InviteAdminForm closeModal={handleClose} />
            </Modal>
        </div>
    </main>
  );
}