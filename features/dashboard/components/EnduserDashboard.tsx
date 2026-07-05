import { SlidingContainers } from "@/features/staff-dashboard-sliders/components";

export type MockAppointmentCard = {
    id: string;
    href: string;
    value: string;
}

const cards = [
    {
        id: 'appt-001',
        href: '/appointment',
        value: ''
    }
]

/* we need to mock the barbers, and the stores - then create two routes discovory/barbers discovery/stores */

export default function EnduserDashboard () {
    return (
        <main className="py-6 stacked flex-1 overflow-x-hidden overflow-y-auto scrollbar-none ">
            <SlidingContainers 
                title="Appointments"
                cards={cards}
                
            />
            <SlidingContainers 
                title="Barberos" 
                cards={cards} 
                seeMoreHref="/discover/barbers"    
            />
            <SlidingContainers 
                title="Tiendas" 
                cards={cards} 
                seeMoreHref="/discover/stores"    
            />
        </main>
    );
}