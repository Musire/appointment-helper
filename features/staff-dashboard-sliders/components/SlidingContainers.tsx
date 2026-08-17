import { Caption, H3 } from "@/components/ui";
import { MockAppointmentCard } from "@/features/dashboard/components/EnduserDashboard";
import Link from "next/link";

type Props = {
  title: string;
  cards: MockAppointmentCard[];
  seeMoreHref?: string;
}

export default function SlidingContainers ({
    title,
    cards,
    seeMoreHref
}: Props) {
    return (
        <section className=" w-full h-fit  ">
        
            <Caption className="spaced">
                <H3 className="">{title}</H3>
                {seeMoreHref && (
                    <Link href={seeMoreHref} className="opacity-80 hover:opacity-100 font-semibold">Ver Mas</Link>
                )}
                
            </Caption>
            
            <ul className="py-4 flex  space-x-2 overflow-x-auto scrollbar-none">
                {cards?.map((c) => {
                    return (
                        <li key={c.id} className="">
                            <Link 
                                href={`${c.href}/${c.id}`} 
                                scroll={false} 
                                className="bg-o size-40 centered text-background block"
                            >
                                appt 1
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}