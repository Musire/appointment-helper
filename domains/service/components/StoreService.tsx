import { groupServicesByCategory } from "@/lib/utils/groupArrays";

import ServiceContainer from "@/domains/admin-dashboard/hair-service/components/ServiceContainer";
import { getServices } from "@/domains/service/queries/getServices";

type ServicePageProps = {
  params: {
    slug: string
  }
}

export default async function ServicePage ({ params }: ServicePageProps) {
    const { slug } = await params
    const { categories, services } = await getServices(slug)
    
    const categoriesWithServices = groupServicesByCategory(categories, services)

    return (
      <div className="flex flex-col space-y-6 relative  flex-1">
          <ServiceContainer categories={categoriesWithServices} />
      </div>
    );
}