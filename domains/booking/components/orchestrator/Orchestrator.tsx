"use client";

import type { Step } from "@/domains/booking/context";
import { StepperProvider, useStepper } from "@/domains/booking/context";
import { DateTimeStep, ReviewStep, ServicesStep, StaffStep, StoreStep } from "../steps";
import { FlowInitializer } from "./FlowInitializer";


const STEP_COMPONENTS: Record<Step, React.ComponentType> = {
  store: StoreStep,
  staff: StaffStep,
  service: ServicesStep,
  dateTime: DateTimeStep,
  confirm: ReviewStep
}

type BookingOrchestratorProps = {
  initialFlow?: "store" | "staff";
};

function StepRenderer() {
  const { currentStep } = useStepper();
  const Component = STEP_COMPONENTS[currentStep];

  if (!Component) return null;

  return (
    <div className="w-full">
      <Component />
    </div>
  );
}

export default function Orchestrator({
  initialFlow = "store",
}: BookingOrchestratorProps) {
  return (
    <StepperProvider>
      <FlowInitializer initialFlow={initialFlow} />
      <StepRenderer />
    </StepperProvider>
  );
}