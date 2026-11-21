import AppointmentQr from "@/features/qr-code/components/AppointmentQr";

export default function TestPage () {
    return (
        <div className="flex-1 p-6 centered-col">
            <AppointmentQr appointmentId='testing-id'/>
        </div>
    );
}