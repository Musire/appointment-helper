export type OrchestratorEnv<C, E> = {
  context: C
  external: E
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
  E,
  Registry extends StepRegistry<Step, OrchestratorEnv<C, E>>
> = OrchestratorEnv<C, E> & {
  step: Step
  registry: Registry
  external: E
}

export default function Orchestrator<
  Step extends string,
  C,
  E,
  Registry extends StepRegistry<Step, OrchestratorEnv<C, E>>
>({
  step,
  registry,
  ...env
}: OrchestratorProps<Step, C, E, Registry>) {
  const { mapProps, render } = registry[step]
  return <>{render(mapProps(env))}</>
}
