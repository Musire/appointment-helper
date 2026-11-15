import { ScanQrCode } from "lucide-react";
import Link from "next/link";

export default function QrButton () {
    return (
    <Link 
        href="qr" 
        className="flex items-center space-x-4 cursor-pointer bg-surface-1 normal-space rounded-xl"
    >
        <ScanQrCode strokeWidth={1} size={40} />
        <span className="text-sm font-medium text-main ">Escanee el código QR</span>
    </Link>
    );
}