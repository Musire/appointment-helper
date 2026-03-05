import { AccordianCategory, CategoryAccordians } from "@/app/admin/store/[slug]/services/components";
import ServiceCreation from "./ServiceCreation";
import { CategoryWithServicesType } from "@/lib/helpers/groupArrays";

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