import { logout } from "@/app/actions/auth.actions";

export default function AdminDashboard () {
  return (
    <div className="page-layout">
        <div className="display-layout py-6">
            <h1 className="text-3xl capitalize w-full text-center">admin dashboard</h1>
            <button onClick={logout} className="hover:bg-whitesmoke/37 w-24 normal-space hover:cursor-pointer">logout</button>
        </div>
    </div>
  );
}