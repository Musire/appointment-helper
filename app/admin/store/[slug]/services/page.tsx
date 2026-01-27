import { groupServicesByCategory } from "@/lib/helpers/groupArrays";
import Link from "next/link";

import CategoryAccordians from "@/components/dashboards/services/CategoryAccordians";
import { getServices } from "@/lib/queries/services";

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
      <div className="flex flex-col space-y-6 mt-6">
          <span className="flex items-center space-x-2 justify-end">
            <Link href="services/new/category" className="btn">create category</Link>
            <Link href="services/new/service" className="btn">create service</Link>
          </span>
          <CategoryAccordians items={categoriesWithServices} />
      </div>
    );
}