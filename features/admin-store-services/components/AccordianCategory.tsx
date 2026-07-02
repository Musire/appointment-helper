'use client';
import { CategoryWithServicesType } from "@/lib/utils/groupArrays";

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