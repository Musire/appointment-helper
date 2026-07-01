'use client';
import { CategoryWithServicesType } from "@/lib/helpers/groupArrays";

type Props = {
    category: CategoryWithServicesType
}

export default function AccordianCategory ({ 
    category 
}: Props) {
   
    return (
        <p className="capitalize">
            {category.name} ({category.services.length})
        </p> 
    );
}