'use client';

import { useFetch } from "@/hooks";


export default function StaffDetails () {

    const { status, error, data } = useFetch('/api/staffDetails')

    if (status === 'idle') {
        return null
    }

    if (status === 'loading') {
        return <p className="">loading ...</p>
    }

    if (error) {
        return <p className="text-error-dark">{error}</p>
    }

    return (
        <div className="flex flex-col space-y-6">
            <pre className="">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}