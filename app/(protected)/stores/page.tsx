import { getCurrentUser } from "@/domains/identity/auth/session";
import { AdminStore, StaffStores } from "@/domains/store/components";
import { ParamsType } from "@/lib/types";
import { redirect } from "next/navigation";

type Props = ParamsType<{ storeId: string }>;


export default async function StoresPage({ params }: Props) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  switch (user.role) {
    case "STAFF":
      return <StaffStores />
    case "ADMIN":
      return <AdminStore params={params} />

    default:
      return redirect("/dashboard")
  }
}