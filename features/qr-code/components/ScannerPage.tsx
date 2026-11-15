
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
    const scannerOperationRef = useRef<Promise<void>>(Promise.resolve());
    const generationRef = useRef(0);

    const [error, setError] = useState('');
    const [message, setMessage] = useState(
        'Waiting for appointment QR code...'
    );

    // Validate appointment QR payload.
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

    // Stop and clear scanner sequentially.
    const stopScanner = useCallback(async () => {
        const operation = scannerOperationRef.current
            .catch(() => {})
            .then(async () => {
                const scanner = scannerRef.current;

                if (!scanner) return;

                try {
                    await scanner.stop();
                } catch (err) {
                    console.warn('Scanner stop:', err);
                }

                try {
                    scanner.clear();
                } catch (err) {
                    console.warn('Scanner clear:', err);
                }

                if (scannerRef.current === scanner) {
                    scannerRef.current = null;
                }
            });

        scannerOperationRef.current = operation;

        await operation;
    }, []);

    // Handle successfully decoded QR codes.
    const handleScan = useCallback(
        async (decodedText: string) => {
            if (isProcessingRef.current) return;

            let payload: unknown;

            try {
                payload = JSON.parse(decodedText);
            } catch {
                return;
            }

            if (!isAppointmentQr(payload)) return;

            isProcessingRef.current = true;

            setMessage('Valid appointment found. Redirecting...');

            await stopScanner();

            router.push(
                `/staff/dashboard/checkin/${payload.appointmentId}`
            );
        },
        [router, stopScanner]
    );

    // Start scanner with lifecycle protection.
    const startScanner = useCallback(
        async (generation: number) => {
            const operation = scannerOperationRef.current
                .catch(() => {})
                .then(async () => {
                    if (generation !== generationRef.current) return;

                    if (scannerRef.current) return;

                    const { Html5Qrcode } = await import('html5-qrcode');

                    if (generation !== generationRef.current) return;

                    const scanner = new Html5Qrcode(elementId);

                    scannerRef.current = scanner;

                    try {
                        await scanner.start(
                            { facingMode: 'environment' },
                            {
                                fps: 10,
                                qrbox: {
                                    width: 250,
                                    height: 250,
                                },
                            },
                            handleScan,
                            () => {}
                        );
                    } catch (err) {
                        // Release scanner instance if initialization fails.
                        if (scannerRef.current === scanner) {
                            try {
                                scanner.clear();
                            } catch {}

                            scannerRef.current = null;
                        }

                        throw err;
                    }
                });

            scannerOperationRef.current = operation;

            try {
                await operation;
            } catch (err) {
                if (generation !== generationRef.current) return;

                console.error('Scanner initialization:', err);

                setError('Unable to access camera or start scanner.');
                
                await stopScanner();
            }
        },
        [handleScan, stopScanner]
    );

    // Initialize and clean up scanner.
    useEffect(() => {
        const generation = ++generationRef.current;
        const currentGeneration = generation;

        isProcessingRef.current = false;

        void startScanner(generation);

        return () => {
            // Invalidate pending initialization.
            if (generationRef.current === currentGeneration) {
                generationRef.current = currentGeneration + 1;
            }

            void stopScanner();
        };
    }, [startScanner, stopScanner]);

    // Restart scanner manually.
    const handleRestart = async () => {
        isProcessingRef.current = false;

        setError('');
        setMessage('Waiting for appointment QR code...');

        const generation = ++generationRef.current;

        await stopScanner();

        if (generation !== generationRef.current) return;

        await startScanner(generation);
    };

    return (
        <div className="flex flex-1 flex-col items-center justify-center bg-background p-6">
            <div className="w-full max-w-md space-y-4">

                <div className="overflow-hidden rounded-xl border border-border bg-surface-1">
                    <div
                        id={elementId}
                        className="
                            min-h-87.5
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
                    <div className="rounded-lg border border-error text-error bg-darken-8/error p-4">
                        <p>{error}</p>
                    </div>
                )}

                <button
                    onClick={handleRestart}
                    className="w-full rounded-lg bg-blue-600 normal-space h-16 font-medium text-white cursor-pointer hover:bg-blue-700"
                >
                    Restart Scanner
                </button>

            </div>
        </div>
    );
}
