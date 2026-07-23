import { ServiceCreationForm } from "@/components/forms/";


export default function ServiceCreation () {
  return (
    <div className="flex-1 py-6 stacked items-center">
      <h1 className="text-2xl mt-10">Service Creation</h1>
      <div className="flex-col flex max-w-5xl max-h-[60dvh] overflow-y-scroll scrollbar-none ">
        <ServiceCreationForm 
          data={{
            name: '',
            storeId: '',
            price: 0
          }}
        />
      </div>
    </div>
  );
}