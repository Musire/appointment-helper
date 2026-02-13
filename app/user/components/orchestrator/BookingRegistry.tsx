import { BookingContextType, BookingExternal, DateTimeStep, ServicesStep, StaffStep, StaffStoreStep, StoreStep } from "@/app/user/components";
import ReviewStep from "@/app/user/components/steps/ReviewStep";
import { OrchestratorEnv, StepRegistry } from "@/components/UI/orchestrator/Orchestrator";

type Step = 
    'store' |
    'staff' |
    'storeStaff' |
    'staffStore' |
    'services' |
    'dateTime' |
    'review';

export const BookingRegistry: StepRegistry<Step, OrchestratorEnv<BookingContextType, BookingExternal>> = {
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
    storeStaff: {
        mapProps: env => ({
            staffId: env.context.staff,
            steps: env.external.steps,
            onChange: (v: string) => env.onUpdate({ key: 'staffStore', value: v }),
            onBack: () => env.onBack()
        }),
        render: props => <StaffStoreStep {...props} />
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