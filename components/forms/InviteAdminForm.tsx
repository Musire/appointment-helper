import { inviteAdmin } from "@/app/actions/auth.actions";
import { Form, Input } from "@/components/UI";
import { InviteAdminSchema, InviteAdminType } from "@/validation/InviteAdmin.schema"

export default function InviteAdminForm ({ closeModal }: { closeModal: () => void }) {

  const handleSubmit = (formData: InviteAdminType ) => {
    console.log(formData)
    inviteAdmin(formData?.email)
    
    const timeoutId = setTimeout(() => {
        closeModal();
    }, 1500)

      return () => clearTimeout(timeoutId);
  }

  return (
    <Form
      schema={InviteAdminSchema}
      initialValues={{ email: '' }}
      onSubmit={handleSubmit}
    >
      <Input 
        label="email address"
        name="email"
      />
    </Form>
  );
}