'use client';
import { useStore } from "@/stores";

export default function StaffPage () {
    const store = useStore()

    const inviteStaff = () => console.log('invite sent ')

    return (
      <div className="flex flex-col space-y-6 py-6 ">
          <button onClick={inviteStaff} type="button" className="btn w-32 self-end">invite staff</button>
          <section aria-labelledby="staff-heading">
            <h3 id="staff-heading">Active Staff</h3>
            <ul className="p-4">
              <li>john doe</li>
            </ul>
          </section>
      </div>
    );
}