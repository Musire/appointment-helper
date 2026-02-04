import { StoreBrief } from "@/app/user/components/StoreCard";
import { getParam, RouteParams } from "./getParam";

export function contextFromQuery<C extends Record<string, string | string[] | StoreBrief[] | undefined>>(
  params: RouteParams,
  context: C
): C {
  const restored = { ...context };

  for (const key of Object.keys(context) as (keyof C)[]) {
    const value = getParam(params, key as string); // <-- use your helper
    if (value !== undefined) {
      restored[key] = value as C[typeof key];
    }
  }

  return restored;
}