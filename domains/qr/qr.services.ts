import { AppointmentRepository } from "../appointments/appointment.repositories";
import { generateSignature, validateSignature } from "./qr.utils";
import { checkinType, generateSignedPayloadType } from "./qr.validations";


export async function scanAndValidateService(data: checkinType) {
    const signatureValidated = validateSignature(data)
    if (!signatureValidated) {
        throw new Error('invalid signature on payload');
    }
    
    const created = await AppointmentRepository.checkinAppointment(data.appointmentId)
    return {
        id: created.id,
        signature: data.signature
    }
}

export async function generateSignedPayloadService(
    data: generateSignedPayloadType
) {
    const signature = generateSignature(data.appointmentId);

    return {
        appointmentId: data.appointmentId,
        signature,
    };
}