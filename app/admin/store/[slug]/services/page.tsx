'use client';
import { groupServicesByCategory } from "@/lib/helpers/groupArrays";
import { useStore } from "@/stores";
import Link from "next/link";
import { useMemo } from "react";

import CategoryAccordians from "@/components/dashboards/client/services/CategoryAccordians";

export default function ServicePage () {
    const { categories, services } = useStore()
    
    const categoriesWithServices = useMemo(() => {
      return groupServicesByCategory(categories, services)
    }, [categories, services])

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