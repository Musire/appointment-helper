import { Form, Input } from "@/components/UI"
import { StoreCreationSchema, StoreCreationType } from "@/validation/StoreCreation.schema";

export default function StoreCreationForm ({ onClose } : { onClose: () => void }) {

    const onSubmit = (formData: StoreCreationType) => {
        console.log(formData)
        const formClose = setTimeout(() => {
            onClose()
        }, 1000);
        return () => clearTimeout(formClose);
    }
        
    return (
        <Form 
            onSubmit={onSubmit}
            schema={StoreCreationSchema}
            initialValues={{
                storeName: ''
            }}
        >
            <Input 
                label="store name"
                name="storeName"
            />
        </Form>
    );
}