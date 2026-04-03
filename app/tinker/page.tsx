import { Theme } from "@/components/UI";
import { Button } from "@/components/UI/buttons";


export default function TinkerTestPage () {

    return (
        <main className="p-6 h-dvh w-screen stacked bg-background">
            <Theme />
            <div className="size-40 rounded-xl  surface-1 centered">
                <Button  >button</Button>
            </div>
            <div className="size-40 rounded-xl surface-2 centered" >
                <Button variant="secondary" >button</Button>

            </div>
            <div className="size-40 rounded-xl surface-3 centered">
                <Button variant="ghost" >button</Button>

            </div>
        </main>
    );
}