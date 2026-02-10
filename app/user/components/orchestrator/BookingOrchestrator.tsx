'use client'; 

import { OrchestratorLogic } from "@/components/UI";
import { contextFromQuery, RouteParams, StepResolver } from "@/lib/orchestrator";
import { StaffBrief, StoreBrief } from "../search";
import { BookingRegistry } from "./BookingRegistry";

export type BookingStep = 
    'store' | 
    'staff' | 
    'storeStaff' | 
    'staffStore' | 
    'dateTime' |
    'review' | 
    'services' |
    'dateTime';

export type BookingContextType = {
    anchor: string | undefined;
    store: string | undefined;
    storeStaff: string | undefined;
    staff: string | undefined;
    staffStore: string | undefined;
    review: string | undefined
    services: string | undefined;
    dateTime: string | undefined;
};

const storeFlow: BookingStep[] = [
  'store',
  'storeStaff',
  'services',
  'dateTime',
  'review',
]

const staffFlow: BookingStep[] = [
  'staff',
  'staffStore',
  'services',
  'dateTime',
  'review',
]

const stepCompleted: Record<BookingStep, (ctx: BookingContextType) => boolean> = {
  store: ctx => !!ctx.store,
  staff: ctx => !!ctx.staff,
  storeStaff: ctx => !!ctx.storeStaff,
  staffStore: ctx => !!ctx.staffStore,
  services: ctx => !!ctx.services?.length,
  dateTime: ctx => !!ctx.dateTime,
  review: ctx => false,
}

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
        storeStaff: undefined,
        staff: undefined,
        staffStore: undefined,
        services: undefined,
        dateTime: undefined,
        review: undefined
    })

    const resolver2: StepResolver<BookingContextType, BookingStep> = (context) => {
        if (context.anchor === 'store' && !context.store) return 'store'
        if (context.anchor === 'staff' && !context.staff) return 'staff'
        if (context.store && !context.storeStaff) return 'storeStaff'
        if (context.staff && !context.staffStore) return 'staffStore'
        if (context.staffStore || context.storeStaff) return 'services'

        return 'review';
    };

    const resolver: StepResolver<BookingContextType, BookingStep> = (context) => {
        const flow =
            context.anchor === 'store'
            ? storeFlow
            : staffFlow

        const nextStep = flow.find(step => !stepCompleted[step](context))

        return nextStep ?? 'review'
    }

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