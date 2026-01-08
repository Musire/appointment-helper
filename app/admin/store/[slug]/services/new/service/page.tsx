import { ServiceCreationForm } from "@/components/forms/";
import { BackButton } from "@/components/UI/buttons";

export default function ServiceCreation () {
  return (
    <div className="panel-layout flex-col flex items-center">
      <span className="spaced my-6 max-w-3xl  w-full">
        <BackButton />
        <h1 className="text-2xl">Service Creation</h1>
      </span>
      <div className="flex-col flex max-w-5xl max-h-[60dvh] overflow-y-scroll scrollbar-none ">
        <ServiceCreationForm 
          data={{
            name: '',
            storeId: '',
            categoryId: '',
            durationMin: 0,
            priceCents: 0,
            type: 'SINGLE',
          }}
        />
      </div>
    </div>
  );
}