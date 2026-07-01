import { StoreCreationForm } from "@/components/forms";
import { BackButton } from "@/components/UI/buttons";

export default function NewStore () {

  return (
    <div className="page-layout">
        <div className="display-layout items-center space-y-6 pt-6">
            <span className="spaced w-56">
              <BackButton />
              <h1 className="capitalize text-3xl">new store</h1>
            </span>
            <div className="flex flex-col items-center">
              <StoreCreationForm  />
            </div>
        </div>
    </div>
  );
}