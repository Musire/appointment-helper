import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

interface CameraScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

export default function CameraScanner({ 
  onScanSuccess 
}: CameraScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const regionId = "html5qr-code-full-region";

  useEffect(() => {
    // Initialize scanner with standard configuration
    scannerRef.current = new Html5QrcodeScanner(
      regionId,
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true
      },
      /* verbose= */ false
    );

    // Render scanner and handle results
    scannerRef.current.render(
      (decodedText) => {
        onScanSuccess(decodedText);
      },
      (error) => {
        // Silent failure keeps the log clean during continuous scanning
      }
    );

    // Clean up scanner instance on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((err) => {
          console.error("Failed to clear scanner on unmount", err);
        });
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="scanner-container">
      <div id={regionId} />
    </div>
  );
};
