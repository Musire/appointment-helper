'use client';

import {
  AvailabilityStoreSelection,
  AvailabilityWeekdays,
  AvailabilityWeekend
} from "@/components/partials";
import { FieldPath, FieldValues } from "react-hook-form";

export type Step<Ctx, T extends FieldValues> = {
  id: string;
  fields: FieldPath<T>[];
  render: (ctx: Ctx) => React.ReactNode;
};

const AvailabilitySteps = [
  {
    id: "store_selection",
    fields: ["storeId"],
    render: ({ stores }: { stores: any[]}) => <AvailabilityStoreSelection stores={stores} />,
  },
  {
    id: "weekdays",
    fields: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    render: () => <AvailabilityWeekdays />,
  },
  {
    id: "weekend",
    fields: ["saturday", "sunday"],
    render: () => <AvailabilityWeekend />,
  } 
];

export default AvailabilitySteps;