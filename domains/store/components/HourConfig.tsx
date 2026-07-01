import { HoopForm } from "@/domains/admin-dashboard";
import { getStoreConfig } from "@/lib/queries/storeConfig";
import { notFound } from "next/navigation";
import { EditButton } from "./components";

type ConfigProps = {
  params: { 
    slug: string
  }
}

export default async function ConfigPage ({ params }: ConfigProps) {
    const { slug } = await params
    const result = await getStoreConfig(slug);

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

