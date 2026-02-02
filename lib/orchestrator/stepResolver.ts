export type StepResolver<C, Step extends string> = (ctx: C) => Step
