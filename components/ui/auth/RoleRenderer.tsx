import { RoleType } from "@/domains/auth/auth.types";
import { getCurrentUserFull } from "@/domains/auth/util/session";
import { redirect } from "next/navigation";

type Props = {
  roles: Partial<Record<RoleType, React.ReactNode>>;
  fallback?: React.ReactNode;
};

// Kept as a regular named export
export async function RoleRenderer({ roles, fallback }: Props) {
  const user = await getCurrentUserFull();

  if (!user) {
    redirect("/login");
  }

  const userRole = user.user_metadata?.role;
  if (!userRole) {
    redirect("/unauthorized");
  }

  const role = userRole.toUpperCase() as RoleType;
  const component = roles[role] ?? fallback;

  if (!component) {
    redirect("/unauthorized");
  }

  return <>{component}</>;
}
