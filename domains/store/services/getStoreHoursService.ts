import { storeRepository } from "../repositories/storeRepository";

export async function getStoreHoursService (storeId: string) {
    const hours = await storeRepository.getStoreHours(storeId);

    // 2. Define UI row order rules
    const orderMap: Record<string, number> = {
        'lun - vier': 1,
        'sabado': 2,
        'domingo': 3
    };

    // 3. Transform and return sorted data
    return [...hours].sort((a, b) => {
        const weightA = orderMap[a.label] ?? 99;
        const weightB = orderMap[b.label] ?? 99;
        return weightA - weightB;
    });
}
