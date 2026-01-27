export type CategoryType = {
    id: string;
    name: string;
}

export type ServiceType = {
    id: string;
    name: string;
    categoryId: string | null;
    durationMin: number;
    priceCents: number;
    type: 'SINGLE' | 'COMBO';
}

export type CategoryWithServicesType = CategoryType & {
  services: ServiceType[]
}

export function groupServicesByCategory(
  categories: CategoryType[],
  services: ServiceType[]
): CategoryWithServicesType[] {
  const serviceMap = new Map<string, ServiceType[]>()

  for (const service of services) {

    if (service?.categoryId) {
      if (!serviceMap.has(service.categoryId)) {
          serviceMap.set(service.categoryId, [])
        }
      serviceMap.get(service.categoryId)!.push(service)
    }
    
  }

  return categories.map(category => ({
    ...category,
    services: serviceMap.get(category.id) ?? [],
  }))
}
