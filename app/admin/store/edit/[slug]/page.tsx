import { StoreCreationForm } from "@/components/forms";
import { BackButton } from "@/components/UI/buttons";
import { prisma } from "@/lib/prisma";
import { StoreCreationType } from "@/validation/StoreCreation.schema";

export default async function EditStore ({ params }: { params :{ slug: string} }) {

  const { slug } = await params
  
  const store = await prisma.store.findFirst({
    where : {
      id: slug
    },
    select: {
      id: true,
      name: true,
      description: true
    }
  })

  if (!store) return null

  const data: StoreCreationType = {
    id: store.id,
    name: store.name,
    description: store.description,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  return (
    <div className="page-layout">
        <div className="display-layout items-center">
            <span className="w-full spaced">
              <BackButton />
              <h1 className="">edit page</h1>
            </span>
            <div className="flex-col flex items-center mt-10 space-y-6 ">
              <StoreCreationForm isUpdate data={data} />
            </div>
        </div>
    </div>
  );
}