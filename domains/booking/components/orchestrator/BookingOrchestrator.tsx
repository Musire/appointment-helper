'use client'; 

import { OrchestratorLogic } from "@/components/UI";
import { contextFromQuery, RouteParams, StepResolver } from "@/lib/orchestrator";
import { StaffBrief, StoreBrief } from "../search";
import { BookingRegistry } from "./BookingRegistry";

export type BookingStep = 
    'store' |
    'storeDetails' | 
    'staff' | 
    'staffDetails' |
    'storeStaff' | 
    'staffStore' | 
    'services' |
    'dateTime' |
    'review' ;

export type BookingContextType = {
    anchor: string | undefined;
    store: string | undefined;
    storeDetails: boolean | undefined;
    storeStaff: string | undefined;
    staff: string | undefined;
    staffDetails: boolean| undefined;
    staffStore: string | undefined;
    review: string | undefined
    services: string | undefined;
    dateTime: string | undefined;
};

const storeFlow: BookingStep[] = [
  'store',
  'storeDetails',
  'storeStaff',
  'staffDetails',
  'services',
  'dateTime',
  'review',
]

const staffFlow: BookingStep[] = [
  'staff',
  'staffDetails',
  'staffStore',
  'storeDetails',
  'services',
  'dateTime',
  'review',
]

const stepCompleted: Record<BookingStep, (ctx: BookingContextType) => boolean> = {
  store: ctx => !!ctx.store,
  storeDetails: ctx => !!ctx.storeDetails,
  staff: ctx => !!ctx.staff,
  staffDetails: ctx => !!ctx.staffDetails,
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
    steps: string[]
};

export function BookingOrchestrator ({ query, stores, staff }: BookingProps) {

    const context: BookingContextType = contextFromQuery(query, {
        anchor: 'store',
        store: undefined,
        storeDetails: undefined,
        storeStaff: undefined,
        staff: undefined,
        staffDetails: undefined,
        staffStore: undefined,
        services: undefined,
        dateTime: undefined,
        review: undefined
    })

    const steps = context.anchor === 'store' 
        ? storeFlow
        : staffFlow

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
            external={{ stores, staff, steps }}
        />
    );
}