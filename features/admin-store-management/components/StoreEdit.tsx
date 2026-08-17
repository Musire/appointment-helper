import { StoreCreationForm } from "@/components/forms";

type Props = {
  params: Promise<{
    storeId: string
  }>
}

export default async function StoreEdit ({ params }: Props) {
    const { storeId } = await params

    return (
        <StoreCreationForm
            isUpdate
            data={{
                name: '',
                address: ''
            }}
        />
    );
}