import { groupServicesByCategory } from "@/lib/utils/groupArrays";

import { getServices } from "@/domains/service/queries/getServices";
import ServiceContainer from "./ServiceContainer";

type Props = {
  params: Promise<{ storeId: string }>
}

export default async function ServicePage ({ params }: Props) {
    const { storeId } = await params
    const { categories, services } = await getServices(storeId)
    
    const categoriesWithServices = groupServicesByCategory(categories, services)

    return (
      <div className="flex flex-col space-y-6 relative  flex-1">
          <ServiceContainer categories={categoriesWithServices} />
      </div>
    );
}