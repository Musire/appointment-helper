
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useToast } from '@/context/ToastContext';
import { scanAndCheckin } from '@/domains/qr/qr.actions';

type AppointmentQrPayload = {
    appointmentId: string;
    signature: string;
};

export default function ScannerPage() {
    const elementId = 'qr-reader';

    const scannerRef = useRef<any>(null);
    const isProcessingRef = useRef(false);
    const scannerOperationRef = useRef<Promise<void>>(Promise.resolve());
    const generationRef = useRef(0);

    const { createSuccess } = useToast();

    const [error, setError] = useState('');
    const [message, setMessage] = useState(
        'Waiting for appointment QR code...'
    );

    const [scannedText, setScannedText] = useState<string | null>(null);

    const [scannedPayload, setScannedPayload] =
        useState<AppointmentQrPayload | null>(null);

    // Validate appointment QR payload.
    const isAppointmentQr = (
        payload: unknown
    ): payload is AppointmentQrPayload => {
        return (
            typeof payload === 'object' &&
            payload !== null &&
            'appointmentId' in payload &&
            'signature' in payload &&
            typeof payload.appointmentId === 'string' &&
            payload.appointmentId.length > 0 &&
            typeof payload.signature === 'string' &&
            /^[a-f0-9]{64}$/i.test(payload.signature)
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
                    if (scanner.isScanning) {
                        await scanner.stop();
                    }
                } catch {}

                try {
                    scanner.clear();
                } catch {}

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

            isProcessingRef.current = true;

            setScannedText(decodedText);
            setScannedPayload(null);
            setError('');

            let payload: unknown;

            try {
                payload = JSON.parse(decodedText);
            } catch {
                setMessage('QR detected, but content is not valid JSON.');

                isProcessingRef.current = false;
                return;
            }

            if (!isAppointmentQr(payload)) {
                setMessage('QR detected, but it is not an appointment QR.');

                isProcessingRef.current = false;
                return;
            }

            setScannedPayload(payload);
            setMessage('Valid appointment QR. Checking in...');

            // Stop camera before executing server action.
            await stopScanner();

            try {
                const result = await scanAndCheckin({
                    appointmentId: payload.appointmentId,
                    signature: payload.signature,
                });

                // Handle failed server action.
                if (!result.success) {
                    setError(
                        result.error ?? 'Appointment check-in failed.'
                    );

                    setMessage('Appointment check-in failed.');
                    return;
                }

                // Handle successful check-in.
                createSuccess('Appointment checked in');

                setMessage('Appointment checked in successfully!');
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Unable to check in appointment.'
                );

                setMessage('Appointment check-in failed.');
            }
        },
        [stopScanner, createSuccess]
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
                                qrbox: undefined,
                            },
                            (decodedText: string) => {
                                void handleScan(decodedText);
                            },
                            () => {}
                        );
                    } catch (err) {
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

                setError(
                    err instanceof Error
                        ? err.message
                        : 'Unable to access camera or start scanner.'
                );

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
        setScannedText(null);
        setScannedPayload(null);
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

                {scannedText !== null && (
                    <div className="rounded-lg border border-border bg-surface-1 p-4 space-y-3">
                        <h2 className="font-semibold">
                            Detected QR Content
                        </h2>

                        <pre className="overflow-x-auto whitespace-pre-wrap break-all text-sm">
                            {scannedText}
                        </pre>
                    </div>
                )}

                {scannedPayload && (
                    <div className="rounded-lg border border-border bg-surface-1 p-4 space-y-3">
                        <h2 className="font-semibold">
                            Appointment QR Payload
                        </h2>

                        <pre className="overflow-x-auto whitespace-pre-wrap break-all text-sm">
                            {JSON.stringify(scannedPayload, null, 2)}
                        </pre>
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
