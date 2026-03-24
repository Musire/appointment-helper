'use client';
import { logout } from "@/app/actions/auth.actions";


export default function header () {
    return (
        <div className="bg-darkest border-b border-whitesmoke/15 w-full h-14 centered">
            <button onClick={logout} type="button" className="btn">logout</button>
        </div>
    );
}