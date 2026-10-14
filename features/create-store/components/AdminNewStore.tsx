import { StoreCreationForm } from "@/components/forms";
import { BackButton } from "@/components/ui/buttons";

export default function AdminNewStore () {

  return (
    <section className="centered-col flex-1 space-y-6 p-6">
          <div className="spaced w-full px-6">
            <BackButton />
            <h1 className="capitalize text-xl">new store</h1>
          </div>
          <div className="w-full h-96">
            <StoreCreationForm  />
          </div>
    </section>
  );
}