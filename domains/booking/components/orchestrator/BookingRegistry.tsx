import { OrchestratorEnv, StepRegistry } from "@/components/UI/orchestrator/Orchestrator";
import {
    BookingContextType,
    BookingExternal,
    BookingStep,
    DateTimeStep,
    ReviewStep,
    ServicesStep,
    StaffDetailsStep,
    StaffStep,
    StaffStoreStep,
    StoreDetailsStep,
    StoreStaffStep,
    StoreStep
} from "@/domains/booking/components";


export const BookingRegistry: StepRegistry<BookingStep, OrchestratorEnv<BookingContextType, BookingExternal>> = {
    store: {
        mapProps: env => ({
            value: env.context.store,
            stores: env.external.stores,
            steps: env.external.steps,
            onChange: (v: string) => env.onUpdate({ key: 'store', value: v }),
            changeAnchor: (v: string) => env.onUpdate({ key: 'anchor', value: v}),
            onBack: () => env.onBack()
        }),
        render: props => <StoreStep {...props} />
    },
    storeDetails: {
        mapProps: env => ({
            store: env.context.store,
            staffStore: env.context.staffStore,
            steps: env.external.steps,
            onChange: () => env.onUpdate({ key: 'storeDetails', value: true }),
            onBack: () => env.onBack()
        }),
        render: props => <StoreDetailsStep {...props} />
    },
    staff: {
        mapProps: env => ({
            value: env.context.staff,
            staff: env.external.staff,
            steps: env.external.steps,
            onChange: (v: string) => env.onUpdate({ key: 'staff', value: v }),
            changeAnchor: (v: string) => env.onUpdate({ key: 'anchor', value: v}),
            onBack: () => env.onBack()
        }),
        render: props => <StaffStep {...props} />
    },
    staffDetails: {
        mapProps: env => ({
            storeStaffId: env.context.storeStaff,
            staffId: env.context.staff,
            steps: env.external.steps,
            anchor: env.context.anchor,
            onChange: () => env.onUpdate({ key: 'staffDetails', value: true }),
            changeAnchor: (v: string) => env.onUpdate({ key: 'anchor', value: v}),
            onBack: () => env.onBack()
        }),
        render: props => <StaffDetailsStep {...props} />
    },
    storeStaff: {
        mapProps: env => ({
            storeId: env.context.store,
            steps: env.external.steps,
            anchor: env.context.anchor,
            onChange: (v: string) => env.onUpdate({ key: 'storeStaff', value: v }),
            onBack: () => env.onBack()
        }),
        render: props => <StoreStaffStep {...props} />
    },
    staffStore: {
        mapProps: env => ({
            staffId: env.context.staff,
            steps: env.external.steps,
            onChange: (v: string) => env.onUpdate({ key: 'staffStore', value: v }),
            onBack: () => env.onBack()
        }),
        render: props => <StaffStoreStep {...props} />
    },
    services: {
        mapProps: env => ({
            storeId: env.context.store || env.context.staffStore,
            steps: env.external.steps,
            onChange: (v: string) => env.onUpdate({ key: 'services', value: v }),
            onBack: () => env.onBack()
        }),
        render: props => <ServicesStep {...props} />
    },
    dateTime: {
        mapProps: env => ({
            storeId: env.context.store || env.context.staffStore,
            steps: env.external.steps,
            onChange: (v: string) => env.onUpdate({ key: 'dateTime', value: v }),
            onBack: () => env.onBack()
        }),
        render: props => <DateTimeStep {...props} />
    },
    review: {
        mapProps: env => ({
            value: env.context,
            steps: env.external.steps,
            onBack: () => env.onBack(),
            onSubmit: (data: BookingContextType) => env.onSubmit(data)
        }),
        render: props => <ReviewStep {...props} />
    },
}