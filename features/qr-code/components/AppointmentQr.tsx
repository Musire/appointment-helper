"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

import { generateSignedQrPayload } from "@/domains/qr/qr.actions";
import { AppointmentQrPayload } from "@/domains/qr/qr.types";

type Props = {
  appointmentId: string;
};

export default function AppointmentQr({ appointmentId }: Props) {
  const [payload, setPayload] = useState<AppointmentQrPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function generateQr() {
      try {
        if (!appointmentId) return;
        setLoading(true);
        setError(null);

        const result = await generateSignedQrPayload({ appointmentId });
        console.log(result)

        if (!result.success || !result.data) {
          throw new Error(result.error ?? "Unable to generate QR");
        }

        setPayload(result.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    generateQr();
  }, [appointmentId]);

  if (loading) return <p>Generating QR code...</p>;

  if (error) return <p>{error}</p>;

  if (!payload) return null;

  return (
    <div className="mx-auto">
      <QRCodeSVG
        value={JSON.stringify(payload)}
        size={400}
        level="M"
        marginSize={4}
    />
    </div>
  );
}