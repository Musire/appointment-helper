import { z } from "zod";

export const serviceSchema = z.object({
    id: z.string().optional(),
    storeId: z.string().min(1, "storeid is required"),
    name: z.string().min(1, "name is required"),
    price: z
      .number({
        error: (issue) => 
          issue.input === undefined 
            ? "price is required" 
            : "price must be a number",
      })
      .min(0, "price cannot be negative"),
})

// Type inference to use in your application
export type serviceSchemaType = z.infer<typeof serviceSchema>;
