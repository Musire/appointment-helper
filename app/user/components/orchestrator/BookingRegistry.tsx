import { StaffStep, StoreStep, BookingContextType, BookingExternal, StaffStoreStep, ServicesStep, DateTimeStep } from "@/app/user/components";
import ReviewStep from "@/app/user/components/ReviewStep";
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
            onChange: (v: string) => env.onUpdate({ key: 'staff', value: v }),
            changeAnchor: (v: string) => env.onUpdate({ key: 'anchor', value: v}),
            onBack: () => env.onBack()
        }),
        render: props => <StaffStep {...props} />
    },
    storeStaff: {
        mapProps: env => ({
            staffId: env.context.staff,
            onChange: (v: string) => env.onUpdate({ key: 'staffStore', value: v }),
            onBack: () => env.onBack()
        }),
        render: props => <StaffStoreStep {...props} />
    },
    staffStore: {
        mapProps: env => ({
            staffId: env.context.staff,
            onChange: (v: string) => env.onUpdate({ key: 'staffStore', value: v }),
            onBack: () => env.onBack()
        }),
        render: props => <StaffStoreStep {...props} />
    },
    services: {
        mapProps: env => ({
            storeId: env.context.store || env.context.staffStore,
            onChange: (v: string) => env.onUpdate({ key: 'services', value: v }),
            onBack: () => env.onBack()
        }),
        render: props => <ServicesStep {...props} />
    },
    dateTime: {
        mapProps: env => ({
            storeId: env.context.store || env.context.staffStore,
            onChange: (v: string) => env.onUpdate({ key: 'dateTime', value: v }),
            onBack: () => env.onBack()
        }),
        render: props => <DateTimeStep {...props} />
    },
    review: {
        mapProps: env => ({
            value: env.context,
            onSubmit: (data: BookingContextType) => env.onSubmit(data)
        }),
        render: props => <ReviewStep {...props} />
    },
}