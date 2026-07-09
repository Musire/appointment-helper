import EditButton from "@/domains/availability/components/EditButton";
import { getStoreConfig } from "@/domains/store/queries/storeConfig";
import { HoopForm } from "@/features/update-business-hours/components";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ storeId: string }>
}

export default async function ConfigPage ({ params }: Props) {
    const { storeId } = await params
    const result = await getStoreConfig(storeId);

    switch (result.status) {
      case "STORE_NOT_FOUND":
        notFound();

      case "CONFIG_MISSING":
        return <EditButton storeId={result.storeId} />;

      case "OK":
        return (
          <div className="py-6 flex flex-col">
            <HoopForm />
          </div>
        );
    } 
}

