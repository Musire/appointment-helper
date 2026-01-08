'use client';
import { CategoryWithServicesType } from "@/lib/helpers/groupArrays";

export default function AccordianCategory ({ category }: { category: CategoryWithServicesType}) {
   
    return (
        <p className="capitalize">
            {category.name} ({category.services.length})
        </p> 
    );
}