
export type MockAppointmentCard = {
    id: string;
    href: string;
    value: string;
}



export default function EnduserDashboard () {
    return (
        <main className="p-6 stacked flex-1 min-h-0 overflow-hidden ">
            <div className="flex-1 min-h-0 flex flex-col space-y-4 overflow-y-hidden">
                <h3 className="shrink-0">Upcoming appointments</h3>
                <div className="  min-h-0 flex flex-col flex-1 gap-y-4 overflow-y-scroll scrollbar-adjust">
                    <div className="bg-surface-1 w-full h-20 shrink-0"></div>
                    <div className="bg-surface-1 w-full h-20 shrink-0"></div>
                    <div className="bg-surface-1 w-full h-20 shrink-0"></div>
                    <div className="bg-surface-1 w-full h-20 shrink-0"></div>
                    <div className="bg-surface-1 w-full h-20 shrink-0"></div>
                    <div className="bg-surface-1 w-full h-20 shrink-0"></div>
                    <div className="bg-surface-1 w-full h-20 shrink-0"></div>
                    <div className="bg-surface-1 w-full h-20 shrink-0"></div>
                </div>
            </div>
        </main>
    );
}
