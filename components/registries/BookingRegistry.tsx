import { StaffStep, StoreStep } from "@/app/user/components";
import { BookingContextType, BookingExternal } from "@/app/user/components/BookingOrchestrator";
import ReviewStep from "@/app/user/components/ReviewStep";
import { OrchestratorEnv, StepRegistry } from "@/components/UI/orchestrator/Orchestrator";

export const BookingRegistry: StepRegistry< 'store' | 'staff' | 'review', OrchestratorEnv<BookingContextType, BookingExternal>> = {
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
    review: {
        mapProps: env => ({
            value: env.context,
            onSubmit: (data: BookingContextType) => env.onSubmit(data)
        }),
        render: props => <ReviewStep {...props} />
    },
}