import { useStepper } from "@/domains/booking/context";
import { useEffect } from "react";

export function FlowInitializer({ initialFlow }: { initialFlow: "store" | "staff" }) {
  const { startFlow } = useStepper();

  useEffect(() => {
    startFlow(initialFlow);
  }, [initialFlow]);

  return null;
}