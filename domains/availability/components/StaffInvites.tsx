import StaffInviteCard from "@/domains/availability/components/StaffInviteCard";
import { $Enums } from "@/generated/prisma";
import Link from "next/link";

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
  invites: Invites
}

export default function StaffInvites ({ invites }: Props) {
    return (
        <div className="stacked flex-1 p-6">
          <div className="w-full flex space-x-4">
                <Link href="/stores" className="w-32 border border-border hover:bg-surface-1 rounded-full centered normal-space cursor-pointer ">Stores</Link>
                <p className="w-32 bg-main text-background rounded-full centered normal-space cursor-pointer">Invites</p>
            </div>
          <div className="stacked space-y-4 ">
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
        </div>
    );
}