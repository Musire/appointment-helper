import { prisma } from "@/lib/prisma";
import { unslugify } from "../stringMutate";
import { StoreConfig } from "@/generated/prisma";

export type StoreConfigResult =
  | { status: "STORE_NOT_FOUND" }
  | { status: "CONFIG_MISSING"; storeId: string }
  | { status: "OK"; storeId: string; config: StoreConfig };

export async function getStoreConfig(slug: string): Promise<StoreConfigResult> {
    const store = await prisma.store.findUnique({
        where: { name: unslugify(slug) },
        select: { id: true },
    });

    if (!store) {
        return { status: "STORE_NOT_FOUND" };
    }

    const config = await prisma.storeConfig.findUnique({
        where: { storeId: store.id },
    });

    if (!config) {
        return { status: "CONFIG_MISSING", storeId: store.id };
    }

    return {
        status: "OK",
        storeId: store.id,
        config,
    };
}
