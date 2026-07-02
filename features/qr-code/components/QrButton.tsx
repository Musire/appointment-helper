import { Body, BodySm } from "@/components/UI";
import { ChevronRight, ScanQrCode } from "lucide-react";
import Link from "next/link";

export default function QrButton () {
    return (
    <Link 
        href="qr" 
        className="grid grid-rows-2 p-4 gap-x-4 grid-cols-[40_1fr_20] surface-3 hover:cursor-pointer hover:bg-surface-2 active:bg-surface-4"
    >
        <ScanQrCode strokeWidth={1} className="row-span-2" size={40} />
        <Body className="place-self-start text-main ">Escanee el código QR</Body>
        <BodySm className="place-self-start text-else col-start-2">
          Escanee el código QR del cliente para registrarlo
        </BodySm>
        <ChevronRight className="row-span-full col-start-3  w-full h-full" />
    </Link>
    );
}