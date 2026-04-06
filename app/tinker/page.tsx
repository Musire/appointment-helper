import {
    Body,
    BodySm,
    Caption,
    H1,
    H2,
    H3,
    Label,
    Legend,
    Theme
} from "@/components/UI";
import { Button } from "@/components/UI/buttons";


export default function TinkerTestPage () {

    return (
        <main className="p-6 h-dvh w-screen stacked bg-background">
            <Theme />
            <div className="surface-1 p-6 rounded-xl">
                <H1 className="text-main">heading</H1>
                <H2 className="text-else" >heading</H2>
                <H3 className="text-disabled" >heading</H3>
                <Body >body</Body>
                <BodySm >body</BodySm>
                <Caption >caption</Caption>
                <Label >label</Label>
                <Legend >legend</Legend>
            </div>
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