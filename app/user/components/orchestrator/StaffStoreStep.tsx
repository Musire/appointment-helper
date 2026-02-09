import StoreSelection from "../StoreSelection";

type StaffStoreProps = {
    staffId: string;
    onBack: () => void;
    onChange: (v:string) => void;
}

export default function StaffStoreStep ({ staffId, onBack, onChange }: StaffStoreProps) {
    return (
        <div className="">
            <StoreSelection {...{onChange}} {...{staffId}} />
            <button 
                onClick={onBack}
                className="btn absolute bottom-20 left-6"
            >
                Back
            </button>
        </div>
    );
}