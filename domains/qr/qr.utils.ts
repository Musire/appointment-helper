import { createHmac, timingSafeEqual } from "crypto";
import "server-only";

import { checkinType } from "./qr.validations";

function getQrSecret(): string {
    const secret = process.env.QR_SECRET;

    if (!secret) {
        throw new Error("QR_SECRET is not configured");
    }

    return secret;
}

export function generateSignature(appointmentId: string): string {
    return createHmac("sha256", getQrSecret())
        .update(`appointment:${appointmentId}`)
        .digest("hex");
}

export function validateSignature(data: checkinType): boolean {
    if (!/^[a-f0-9]{64}$/i.test(data.signature)) {
        return false;
    }

    const expectedSignature = generateSignature(data.appointmentId);

    const expected = Buffer.from(expectedSignature, "hex");
    const received = Buffer.from(data.signature, "hex");

    return timingSafeEqual(expected, received);
}