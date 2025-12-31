import { CreateStoreButton } from "@/components/dashboards/client";
import { LogoutButton } from "@/components/UI/buttons";

export default function AdminDashboard () {
  return (
    <div className="page-layout">
        <div className="display-layout py-6">
            <h1 className="text-3xl capitalize w-full text-center">admin dashboard</h1>
            <LogoutButton />
            <CreateStoreButton />
        </div>
    </div>
  );
}