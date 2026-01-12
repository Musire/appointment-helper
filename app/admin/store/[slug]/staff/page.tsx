'use client';
import { useStore } from "@/stores";
import Link from "next/link";

export default function StaffPage () {
    const { store } = useStore()

    return (
      <div className="flex flex-col space-y-6 py-6 ">
          <Link href='staff/invite' type="button" className="btn w-32 self-end">invite staff</Link>
          <section aria-labelledby="staff-heading">
            <h3 id="staff-heading">Invitations</h3>
            <ul className="p-6">
              <li className="bg-darkest border border-whitesmoke/20 normal-space min-w-56 w-fit">
                <article className="grid grid-rows-2 grid-cols-[1fr_2fr_1fr] gap-x-2 place-content-center items-center p-4">
                  <div className="size-12 rounded-full border border-whitesmoke/20 bg-darker row-span-2" />
                  <p className="col-start-2 text-whitesmoke/87 px-2">full name</p>
                  <p className="col-start-2 text-whitesmoke/60 px-2">example@email.com</p>
                  <button type="button" className="btn row-span-2 col-start-3 row-start-1">invite</button>
                </article>
              </li>
            </ul>
          </section>
      </div>
    );
}