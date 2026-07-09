import { CategoryWithServicesType } from "@/lib/utils/groupArrays";
import ServiceCreation from "./ServiceCreation";
import { CategoryAccordians } from "@/features/admin-store-services/components";

type Props = {
    categories: CategoryWithServicesType[]
}

export default function ServiceContainer ({  categories }: Props) {
    return (
        <div className="">
            <ServiceCreation />
            <CategoryAccordians items={categories} />
        </div>
    );
}