import StoreUpdateForm from "@/components/forms/StoreUpdateForm";
import { BackButton } from "@/components/ui";
import { StoreUpdateType } from "@/validation/StoreCreation.schema";

type Props = {
  store: StoreUpdateType
}

export default async function AdminStoreEdit ({ store }: Props) {
    return (
        <section className="centered-col  flex-1 space-y-6 p-6">
            <div className="spaced w-full px-6">
                <BackButton />
                <h1 className="capitalize text-xl">edit store</h1>
            </div>
            <div className="w-full h-96">
                <StoreUpdateForm data={store}  />
            </div>
        </section>
    );
}

