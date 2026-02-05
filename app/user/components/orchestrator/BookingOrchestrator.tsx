'use client'; 

import { BookingRegistry } from "@/components/registries/BookingRegistry";
import { OrchestratorLogic } from "@/components/UI";
import { contextFromQuery, RouteParams, StepResolver } from "@/lib/orchestrator";
import { StaffBrief, StoreBrief } from "../search";

export type BookingStep = 'store' | 'staff' | 'review' | 'anchor' | 'stores' ;

export type BookingContextType = {
    anchor: string | undefined;
    store: string | undefined;
    staff: string | undefined;
    review: string | undefined
};

type BookingProps = {
    query: RouteParams;
    stores: StoreBrief[];
    staff: StaffBrief[]
}

export type BookingExternal = {
  stores: StoreBrief[];
  staff: StaffBrief[];
};

export default function BookingOrchestrator ({ query, stores, staff }: BookingProps) {

    const context: BookingContextType = contextFromQuery(query, {
        anchor: 'store',
        store: undefined,
        staff: undefined,
        review: undefined
    })

    const resolver: StepResolver<BookingContextType, BookingStep> = (context) => {
        if (context.anchor === 'staff') return 'staff'
        if (!context.store) return 'store';
        if (!context.staff) return 'staff';
        return 'review';
    };

    const handleSubmit = (data: BookingContextType) => {
        console.log(data)
    }

    return (
        <OrchestratorLogic
            resolver={resolver}
            registry={BookingRegistry}
            onSubmit={handleSubmit}
            context={context}
            external={{ stores, staff }}
        />
    );
}