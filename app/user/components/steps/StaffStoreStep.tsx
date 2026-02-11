import { ArrowLeft } from "lucide-react";
import { StoreSelection } from "../selectors";

type StaffStoreProps = {
    staffId: string;
    onBack: () => void;
    onChange: (v:string) => void;
}

export default function StaffStoreStep ({ staffId, onBack, onChange }: StaffStoreProps) {
    return (
        <div className="flex-col flex space-y-6">
            <button 
                onClick={onBack}
                className="hover:cursor-pointer"
            >
                <ArrowLeft />
            </button>
            <StoreSelection {...{onChange}} {...{staffId}} />
        </div>
    );
}