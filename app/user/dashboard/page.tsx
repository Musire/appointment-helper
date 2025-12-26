
import { logout } from "@/app/actions/auth.actions"

export default function UserDashboard () {

  return (
    <main className="page-layout">
        <div className="display-layout py-6">
            <h1 className="text-3xl capitalize w-full text-center">user dashboard</h1>
            <button onClick={logout} className="hover:bg-whitesmoke/37 w-24 normal-space">logout</button>
        </div>
    </main>
  );
}