'use client';

import { Button } from "@/components/UI/buttons";



export default function TinkerTestPage () {

    return (
        <div className="p-6 h-dvh w-screen bg-deep text-main stacked">
            <Button >primary</Button>
            <Button variant="secondary"  >secondary</Button>
            <Button variant="ghost"  >ghost</Button>
        </div>
    );
}