import { StoreConfig } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { unslugify } from "../../../lib/utils/stringMutate";

export type StoreConfigResult =
  | { status: "STORE_NOT_FOUND" }
  | { status: "CONFIG_MISSING"; storeId: string }
  | { status: "OK"; storeId: string; config: StoreConfig };

export async function getStoreConfig(storeId: string): Promise<StoreConfigResult> {
    const store = await prisma.store.findUnique({
        where: { id: storeId },
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
