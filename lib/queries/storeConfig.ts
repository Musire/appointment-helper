import { prisma } from "@/lib/prisma";
import { unslugify } from "../stringMutate";

export async function getStoreConfig (slug: string) {
    const store = await prisma.store.findUnique({
        where: {
            name: unslugify(slug)
        }
    })

    if (!store) return null;

    const config = await prisma.storeConfig.findUnique({
        where: {
            storeId: store.id
        }
    })

    return { 
        storeId: store.id, 
        config 
    }
}