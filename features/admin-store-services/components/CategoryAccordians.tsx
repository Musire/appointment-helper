'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/UI/accordion";
import { CategoryWithServicesType } from "@/lib/utils/groupArrays";
import AccordianCategory from "./AccordianCategory";
import ServiceCard from "./ServiceCard";

export default function CategoryAccordians ({ items }: { items: CategoryWithServicesType[]}) {
  return (
    <Accordion type="multiple" className=" divide-disabled divide-y">
        {items.map(category => (
            <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger>
                <AccordianCategory category={category} />
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-3 " >
                {category.services.map(service => {
                    return <ServiceCard key={service.id} service={service} />
                })}
            </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
  );
}