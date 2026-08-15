import { ServiceCreationForm } from "@/components/forms";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ storeId: string, serviceId: string }>
}

export default async function AdminServiceEdit({ params }: Props) {
    const { storeId, serviceId } = await params;

    const found = await prisma.service.findUnique({
        where: { id: serviceId }
    });

    if (!found) return null;

    return (
        <ServiceCreationForm 
            isUpdate={true}
            data={{
                id: found.id, 
                storeId,
                name: found.name,
                price: found.price
            }}
        />
    );
}