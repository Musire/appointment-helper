import { AvailabilityStoreSelection, AvailabilityWeekdays } from "@/components/partials";
import { AvailabilityType } from "@/validation/Availability.schema";
import { Path } from "react-hook-form";

const AvailabilitySteps: {
  id: string;
  fields: Path<AvailabilityType>[];
  Panel: React.ComponentType;
}[] = [
  {
    id: "store_selection",
    fields: ["storeId"] as (keyof AvailabilityType)[],
    Panel: AvailabilityStoreSelection,
  },
  {
    id: "weekdays",
    fields: ["monday", "tuesday", "wednesday", "thursday", "friday"] as (keyof AvailabilityType)[],
    Panel: AvailabilityWeekdays
  }
];

export default AvailabilitySteps;