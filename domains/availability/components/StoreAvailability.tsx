import { $Enums } from "@/generated/prisma";
import StaffInviteCard from "./StaffInviteCard";
import StoreStaffCard from "./StoreStaffCard";

type Stores = {
    store: {
    id: string;
    name: string;
    };
}[]

type Invites = ({
    store: {
        id: string;
        name: string;
        address: string;
        createdAt: Date;
        status: $Enums.StoreStatus;
        createdById: string;
    }} & {
    id: string;
    storeId: string;
    createdAt: Date;
    userId: string;
    role: $Enums.StoreRole;
    status: $Enums.InviteStatus;
    invitedBy: string;
})[]


export const mockInvites = [
  {
    id: "mock-invite-001",
    storeId: "urban-cuts",
    createdAt: new Date(),
    userId: "mock-user",
    role: "STAFF" as $Enums.StoreRole,
    status: "PENDING" as $Enums.InviteStatus,
    invitedBy: "mock-manager",
    store: {
      id: "urban-cuts",
      name: "Urban Cuts",
      address: "123 Main Street, Downtown",
      createdAt: new Date(),
      status: "ACTIVE" as $Enums.StoreStatus,
      createdById: "mock-manager",
    },
  },
  {
    id: "mock-invite-002",
    storeId: "elite-barbers",
    createdAt: new Date(),
    userId: "mock-user",
    role: "STAFF" as $Enums.StoreRole,
    status: "PENDING" as $Enums.InviteStatus,
    invitedBy: "mock-manager",
    store: {
      id: "elite-barbers",
      name: "Elite Barbershop",
      address: "456 West Avenue, Shopping District",
      createdAt: new Date(),
      status: "ACTIVE" as $Enums.StoreStatus,
      createdById: "mock-manager",
    },
  },
] satisfies Invites;

type Props = {
  stores: Stores;
  invites: Invites
}

export default function StoreAvailability ({ stores, invites }: Props) {
    return (
        <section className="flex flex-1 p-6 stacked overflow-y-hidden">
            <div className="stacked space-y-4  h-1/2">
                <p className="w-full spaced">
                    <span className="font-medium">Your stores</span>
                    <span className="text-sm border border-success bg-success/20  text-success min-w-24 centered normal-space rounded-full">
                        {`${stores.length} active`}
                    </span>
                </p>
                <div className="flex-1 overflow-y-auto scrollbar-adjust pr-2 space-y-4 ">
                    {stores?.map(s => <StoreStaffCard key={s.store.id} storeStaff={s.store} />)}
                </div>
            </div>

            <div className="stacked space-y-4  h-1/2">
                <p className="w-full spaced">
                    <span className="capitalize font-medium">invites</span>
                    <span className="text-sm border border-alternate bg-alternate/20  text-alternate min-w-24 centered normal-space rounded-full">
                        {`${mockInvites.length} pending`
                    }</span>
                </p>
                <div className="flex-1 overflow-y-auto scrollbar-adjust pr-2 space-y-4">
                    {mockInvites?.map(i=> <StaffInviteCard key={i.id} inviteId={i.id} store={i.store} />)}
                </div>
            </div>
        </section>
    );
}