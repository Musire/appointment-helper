'use client';

import { CategoryWithServicesType } from "@/lib/helpers/groupArrays";
import { 
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger } from "@/components/UI/accordion";
import AccordianCategory from "./AccordianCategory";
import ServiceCard from "./ServiceCard";

export default function CategoryAccordians ({ items }: { items: CategoryWithServicesType[]}) {
  return (
    <Accordion type="multiple">
        {items.map(category => (
            <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger>
                <AccordianCategory category={category} />
            </AccordionTrigger>

            <AccordionContent className="flex-col flex" >
                <span className="self-end">
                <button type="button" className="btn">edit</button>
                <button type="button" className="btn">delete</button>
                </span>
                {category.services.map(service => (
                <ServiceCard key={service.id} service={service} />
                ))}
            </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
  );
}