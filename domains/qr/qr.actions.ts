'use server';

import { createSafeAction, validateSchema } from "../auth/util/safeAction";
import { generateSignedPayloadService, scanAndValidateService } from "./qr.services";
import { checkinSchema, checkinType, generateSignedPayloadSchema, generateSignedPayloadType } from "./qr.validations";


export const scanAndCheckin = createSafeAction(
    {
        allowedRoles: ['STAFF', 'staff']
    },
    async (input: checkinType) => {
        const validated = validateSchema(checkinSchema, input)
        const res = scanAndValidateService(validated)
        return res
    }
)

export const generateSignedQrPayload = createSafeAction(
    {
        allowedRoles: ['USER', 'user']
    },
    async (input: generateSignedPayloadType) => {
        console.log(input)
        const validated = validateSchema(generateSignedPayloadSchema, input)
        const res = generateSignedPayloadService(validated)
        return res
    }
)