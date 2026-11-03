import { logout } from "@/domains/auth/auth.actions";

export default function AdminProfile () {
    return (
        <div className="flex-1 p-6 relative">
            <p className="">profile area</p>
            <button 
                type="button" 
                onClick={logout}
                className="absolute right-4 top-6 normal-space bg-error/20 rounded-lg w-24 cursor-pointer hover:bg-error/40 text-else hover:text-main"
            >
                logout
            </button>
        </div>
    );
}