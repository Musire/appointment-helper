import { AvailabilityForm } from "@/components/forms";

export default function AvailabilityPanel () {
    const defaultData = {
        monday: {
            enabled: false,
            slots: [{id: 0, from: '', to: ''}]
        },
        tuesday: {
            enabled: false,
            slots: [{id: 0, from: '', to: ''}]
        }
    }
    return (
        <div className="py-6">
            <AvailabilityForm data={defaultData} />
        </div>
    );
}