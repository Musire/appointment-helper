'use server';

import { createSafeAction, validateSchema } from "../auth/util/safeAction";
import { getStoreAvailabilityService } from "./availability.services";
import { StoreAvailabilitySchema, StoreAvailabilityType } from "./availability.validations";


export const getStoreAvailability = createSafeAction(
    {
        allowedRoles: ['staff', 'STAFF']
    },
    async (input: StoreAvailabilityType) => {
        const validated = validateSchema(StoreAvailabilitySchema, input)
        const res = getStoreAvailabilityService(validated)
        return res
    }
)