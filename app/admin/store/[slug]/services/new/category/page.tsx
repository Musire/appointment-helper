import { CategoryCreationForm } from "@/components/forms/";
import { BackButton } from "@/components/UI/buttons";

export default function ServiceCategoryForm () {
  return (
    <div className="panel-layout flex-col flex items-center">
      <span className="spaced my-6 max-w-3xl  w-full">
        <BackButton />
        <h1 className="text-2xl">Category Creation</h1>
      </span>
      <div className="my-10 flex-col flex max-w-5xl">
        <CategoryCreationForm 
          data={{
            name: '',
            storeId: ''
          }}
        />
      </div>
    </div>
  );
}