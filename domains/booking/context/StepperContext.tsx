"use client";

import { useOrchestrator } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type FlowType = "store" | "staff";

export type Step =
  | "store"
  | "staff"
  | "service"
  | "dateTime"
  | "confirm";

type FlowState = {
  storeId?: string;
  staffId?: string;
  serviceId?: string;
  dateTime?: string;
};

type StepperContextType = {
  flow: FlowType;
  steps: Step[];
  currentStepIndex: number;
  currentStep: Step;
  formData: FlowState;

  startFlow: (flow: FlowType) => void;
  changeFlow: (flow: FlowType) => void;
  next: () => void;
  back: () => void;
  updateData: (key: keyof FlowState, value: string) => void;
  reset: () => void;
};

const StepperContext = createContext<StepperContextType | undefined>(
  undefined
);

const STORE_FLOW: Step[] = ["store", "staff", "service", "dateTime", "confirm"];
const STAFF_FLOW: Step[] = ["staff", "store", "service", "dateTime", "confirm"];

export function StepperProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const history = useOrchestrator<Step>("booking-history");

  const [flow, setFlow] = useState<FlowType>("store");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<FlowState>({});

  const steps = useMemo(
    () => (flow === "store" ? STORE_FLOW : STAFF_FLOW),
    [flow]
  );

  const currentStep = steps[currentStepIndex];

  // 🔥 Load from URL on mount
  useEffect(() => {
    const stepFromUrl = searchParams.get("step") as Step | null;
    const flowFromUrl = searchParams.get("flow") as FlowType | null;

    if (flowFromUrl) setFlow(flowFromUrl);

    if (stepFromUrl) {
      const index = steps.indexOf(stepFromUrl);
      if (index !== -1) {
        setCurrentStepIndex(index);
      }
    }

    const savedData = localStorage.getItem("booking-data");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // 🔥 Persist formData
  useEffect(() => {
    localStorage.setItem("booking-data", JSON.stringify(formData));
  }, [formData]);

  // 🔥 Sync URL when step changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", currentStep);
    params.set("flow", flow);

    router.replace(`?${params.toString()}`);
  }, [currentStep, flow]);

  function startFlow(selectedFlow: FlowType) {
    setFlow(selectedFlow);
    setCurrentStepIndex(0);
    setFormData({});
    history.clear();
  }

  function changeFlow(newFlow: FlowType) {
    if (newFlow === flow) return;

    setFlow(newFlow);
  }

  function next() {
    if (currentStepIndex < steps.length - 1) {
      history.push(currentStep);
      setCurrentStepIndex((prev) => prev + 1);
    }
  }

  function back() {
    const previous = history.pop();
    if (!previous) return;

    const index = steps.indexOf(previous);
    if (index !== -1) {
      setCurrentStepIndex(index);
    }
  }

  function updateData(key: keyof FlowState, value: string) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function reset() {
    setCurrentStepIndex(0);
    setFormData({});
    history.clear();
    localStorage.removeItem("booking-data");
  }

  return (
    <StepperContext.Provider
      value={{
        flow,
        steps,
        currentStepIndex,
        currentStep,
        formData,
        startFlow,
        changeFlow,
        next,
        back,
        updateData,
        reset,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
}

export function useStepper() {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used inside StepperProvider");
  }
  return context;
}