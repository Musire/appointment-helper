import { CategoryWithServicesType } from "@/lib/helpers/groupArrays";
import CategoryAccordians from "@/new-features/admin-store-services/components/CategoryAccordians";
import ServiceCreation from "./ServiceCreation";

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