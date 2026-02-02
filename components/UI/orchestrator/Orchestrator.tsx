export type OrchestratorEnv<C> = {
  context: C
  onUpdate: <K extends keyof C>(update: { key: K; value: C[K]; }) => void
  onBack: () => void;
  onSubmit: (data:C) => void
}

export type StepConfig<Env, Props> = {
  mapProps: (env: Env) => Props
  render: (props: Props) => React.ReactNode
}

export type StepRegistry<Step extends string, Env> = Record<
  Step,
  StepConfig<Env, any>
>

export type OrchestratorProps<
  Step extends string,
  C,
  Registry extends StepRegistry<Step, OrchestratorEnv<C>>
> = OrchestratorEnv<C> & {
  step: Step
  registry: Registry
}

export default function Orchestrator<
  Step extends string,
  C,
  Registry extends StepRegistry<Step, OrchestratorEnv<C>>
>({
  step,
  registry,
  ...env
}: OrchestratorProps<Step, C, Registry>) {
  const { mapProps, render } = registry[step]
  return <>{render(mapProps(env))}</>
}
