import AdminStore from "@/features/stores/components/admin/AdminStore";
import StaffStores from "@/features/stores/components/staff/StaffStores";
import { getCurrentUser } from "@/lib/auth/session";
import { ParamsType } from "@/lib/queries/types";
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