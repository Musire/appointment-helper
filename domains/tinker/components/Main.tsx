'use client';

import { InviteAdminForm } from "@/components/forms";
import { Modal } from "@/components/UI/modal";
import { useState } from "react";

export default function Main () {
	const [isOpen, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<section className="w-full h-full bg-darkest text-main py-6">
			<button 
				onClick={handleOpen} 
				type="button" 
				className="hover:bg-whitesmoke/37 w-40 normal-space"
			>
				invite admin
			</button>
			<Modal
				title="invite admin"
				isOpen={isOpen}
				onClose={handleClose}
			>
				<InviteAdminForm closeModal={handleClose} />
			</Modal>
		</section>
	);
}