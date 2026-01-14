'use client';
import { InvitationCard } from "@/components/dashboards/client";
import { useStore } from "@/stores";
import Link from "next/link";

export default function StaffPage () {
    const { store } = useStore()

    return (
      <div className="flex flex-col space-y-6 py-6 ">
          <Link href='staff/invite' type="button" className="btn w-32 self-end">invite staff</Link>
          <section aria-labelledby="staff-heading">
            <h3 id="staff-heading">Invitations</h3>
            <ul className="p-6 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
              <InvitationCard />
              <InvitationCard />
              <InvitationCard />
              <InvitationCard />
            </ul>
          </section>
      </div>
    );
}