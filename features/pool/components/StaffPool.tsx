import { PoolPage } from "@/domains/appointments/components/pool";
import { getPool } from "@/domains/appointments/queries/getPool";

export default function StaffPool () {
    const appointments = getPool()
    return (
        <div className="flex-1 flex  overflow-y-hidden">
            <PoolPage appointments={appointments} />
        </div>
    );
}