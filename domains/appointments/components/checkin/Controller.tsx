import { Button } from "@/components/ui/button";

export default function Controller () {
    return (
        <div className="stacked space-y-1 mt-auto">
            <Button className=" normal-space h-12 rounded-md text-lg">Go Back</Button>
            <Button 
                variant="secondary" 
                className="normal-space h-12 hover:bg-surface-1 text-lg" 
            >Scan Another</Button>
        </div>
    );
}