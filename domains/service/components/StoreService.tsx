import { getServices } from "@/domains/service/queries/getServices";
import ServiceContainer from "./ServiceContainer";

type Props = {
  params: Promise<{ storeId: string }>
}

export default async function ServicePage ({ params }: Props) {
    const { storeId } = await params
    const services = await getServices(storeId)

    return (
      <section className="relative p-6 stacked flex-1">
          <ServiceContainer services={services} storeId={storeId} />
      </section>
    );
}