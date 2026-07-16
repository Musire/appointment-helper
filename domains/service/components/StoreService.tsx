import { getServices } from "@/domains/service/queries/getServices";
import ServiceContainer from "./ServiceContainer";

type Props = {
  params: Promise<{ storeId: string }>
}

export default async function ServicePage ({ params }: Props) {
    const { storeId } = await params
    const services = await getServices(storeId)

    return (
      <div className="relative stacked flex-1">
          <ServiceContainer services={services} />
      </div>
    );
}