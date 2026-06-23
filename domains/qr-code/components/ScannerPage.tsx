'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

type AppointmentQrPayload = {
  type: 'appointment';
  appointmentId: string;
};

export default function ScannerPage() {
  const router = useRouter();

  const elementId = 'qr-reader';

  const scannerRef = useRef<any>(null);
  const isProcessingRef = useRef(false);

  const [error, setError] = useState('');
  const [message, setMessage] = useState(
    'Waiting for appointment QR code...'
  );

  const stopScanner = useCallback(async () => {
    const scanner = scannerRef.current;

    if (!scanner) return;

    try {
      await scanner.stop();
    } catch {}

    try {
      scanner.clear();
    } catch {}

    scannerRef.current = null;
  }, []);

  const isAppointmentQr = (
    payload: unknown
  ): payload is AppointmentQrPayload => {
    return (
      typeof payload === 'object' &&
      payload !== null &&
      (payload as AppointmentQrPayload).type === 'appointment' &&
      typeof (payload as AppointmentQrPayload).appointmentId === 'string' &&
      (payload as AppointmentQrPayload).appointmentId.length > 0
    );
  };

  const handleScan = useCallback(
    async (decodedText: string) => {
      if (isProcessingRef.current) return;

      try {
        const payload = JSON.parse(decodedText);

        if (!isAppointmentQr(payload)) {
          return;
        }

        isProcessingRef.current = true;

        setMessage('Valid appointment found. Redirecting...');

        await stopScanner();

        router.push(
          `/staff/dashboard/checkin/${payload.appointmentId}`
        );
      } catch {
        // Ignore QR codes that are not valid appointment payloads
      }
    },
    [router, stopScanner]
  );

  const startScanner = useCallback(async () => {
    try {
      setError('');
      setMessage('Waiting for appointment QR code...');
      isProcessingRef.current = false;

      const { Html5Qrcode } = await import('html5-qrcode');

      const scanner = new Html5Qrcode(elementId);

      scannerRef.current = scanner;

      await scanner.start(
        {
          facingMode: 'environment',
        },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
        },
        handleScan,
        () => {
          // Ignore scan failures
        }
      );
    } catch (err) {
      console.error(err);

      setError(
        'Unable to access camera or start scanner.'
      );
    }
  }, [handleScan]);

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
  }, [startScanner, stopScanner]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950">
          <div
            id={elementId}
            className="
              min-h-[350px]
              [&_video]:w-full
              [&_video]:h-full
              [&_video]:object-cover
            "
          />
        </div>

        <div className="rounded-lg bg-zinc-900 p-4">
          <p className="text-center text-white">
            {message}
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500 bg-red-950 p-4">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <button
          onClick={startScanner}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
        >
          Restart Scanner
        </button>
      </div>
    </div>
  );
}