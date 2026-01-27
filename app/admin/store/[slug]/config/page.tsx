import { getStoreConfig } from "@/lib/queries/storeConfig";
import { ConfigTable, EditButton } from "./components";

type ConfigProps = {
  params: { 
    slug: string
  }
}

export default async function ConfigPage ({ params }: ConfigProps) {
    const { slug } = await params
    const result = await getStoreConfig(slug)

    return (
      <div className="py-6 flex flex-col ">
          <EditButton storeId={result?.storeId ?? null} /> 
          <ConfigTable config={result?.config ?? null} />
      </div>
    );
}

