'use client';
import { QuerySerializable, StepResolver, syncQuery } from "@/lib/orchestrator";
import { useRouter } from "next/navigation";
import Orchestrator from "./Orchestrator";
import { useOrchestrator } from "@/hooks";

export type OrchestratorLogicProps<
  C extends Record<string, QuerySerializable>,
  Step extends string
> = {
  resolver: StepResolver<C, Step>;
  context: C;
  registry: any;
  onSubmit: (data:C) => void;
};

export default function OrchestratorLogic<
  C extends Record<string, QuerySerializable>,
  Step extends string
>({
  resolver,
  context,
  registry,
  onSubmit,
}: OrchestratorLogicProps<C, Step>) {
  const router = useRouter()
  const { push, pop } = useOrchestrator<Step>("orchestrator-history");
  const step = resolver(context);

  const onUpdate = <K extends keyof C>(update: { key: K; value: C[K] }) => {
    context[update.key] = update.value;

    push(step as Step);

    syncQuery(context, router);
  };

  const onBack = () => {
    const lastStep = pop();
    if (!lastStep) return;

    // Remove last step from context
    delete context[lastStep as keyof C];

    // Sync context to URL
    syncQuery(context, router);
  };

  return (
    <Orchestrator
      step={step}
      context={context}
      registry={registry}
      onUpdate={onUpdate}
      onBack={onBack}
      onSubmit={onSubmit}
    />
  );
}
