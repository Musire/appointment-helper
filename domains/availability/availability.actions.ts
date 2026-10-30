'use server';

import { createSafeAction } from "../auth/util/safeAction";
import { saveStoreAvailabilityService } from "./availability.services";
import { SaveStoreAvailabilitySchema } from "./availability.validations";

export const saveStoreAvailability = createSafeAction(
  {
    allowedRoles: ['staff', 'STAFF']
  },
  async (_: any, formData: FormData) => {
    const payload = {
      storeStaffId: formData.get('storeStaffId'),
      blocks: JSON.parse(formData.get('blocks') as string),
    };

    console.log(
      'payload:',
      JSON.stringify(payload, null, 2)
    );

    const validated = SaveStoreAvailabilitySchema.parse(payload);

    return saveStoreAvailabilityService(validated);
  }
);