import { Body, BodySm } from "@/components/UI";
import { ScanQrCode } from "lucide-react";
import Link from "next/link";

export default function QrButton () {
    return (
    <Link 
        href="dashboard/qr" 
        className="grid grid-rows-2 p-4 gap-x-4 grid-cols-[40_1fr] bg-primary hover:cursor-pointer"
    >
        <ScanQrCode className="row-span-2" size={40} />
        <Body className="place-self-start">Scan QR Code</Body>
        <BodySm className="place-self-start">
          Scan customer QR to check them in
        </BodySm>
    </Link>
    );
}