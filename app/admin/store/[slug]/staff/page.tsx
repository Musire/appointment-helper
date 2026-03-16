import { ScrollableContainer } from "@/components/UI/containers";
import { StaffCard } from "@/domains/booking";
import { getStoreStaff } from "@/lib/queries/users";
import Link from "next/link";

export default async function StaffPage ({ params }: { params: { slug: string } }) {
    const { slug } = await params
    const staff = await getStoreStaff(slug)


    return (
      <div className="flex flex-col space-y-6 py-6  w-full">
          <Link href='staff/invite' type="button" className="btn w-32 self-end">invite staff</Link>
          <section aria-labelledby="staff-heading " className="w-full">
            <h3 id="staff-heading">Current Staffing</h3>
            <ScrollableContainer >
              {staff.map(s => (
                <StaffCard key={s.id} staff={s} />
              ))}
            </ScrollableContainer>
            {/* <ul className="p-6  grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
              
            </ul> */}
          </section>
      </div>
    );
}