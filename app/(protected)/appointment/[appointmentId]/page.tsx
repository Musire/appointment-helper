
import { StaffDetails } from "@/domains/appointments/components/details";
import { getCurrentUser } from "@/domains/identity/auth/session";
import { ParamsType } from "@/lib/types";
import { redirect } from "next/navigation";

type Props = ParamsType<{ appointmentId: string }>;

export default async function HistoryPage({ params }: Props) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role === 'STAFF') {
    return <StaffDetails params={params} />;
  }

  if (user.role === 'USER') {
    return <StaffDetails params={params} />;
  }

  return redirect("/dashboard")
}