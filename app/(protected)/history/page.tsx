import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import StaffHistoryDataLayer from "@/domains/history/components/StaffHistoryDataLayer";
import { EnduserHistory } from "@/features/history/components";

export default async function HistoryPage() {
  return (
    <RoleRenderer
      roles={{
        STAFF: <StaffHistoryDataLayer />,
        USER: <EnduserHistory />
      }}
    />
  )
}