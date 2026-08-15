import { StoreServiceRepository } from "@/features/booking/respositories/StoreServiceRepository";
import { serviceSchemaType } from "../validation/service.schema";

export async function upsertOfferingService(serviceData: serviceSchemaType) {
    const { id, ...restOfData } = serviceData;

    if (id) {
        const existingService = await StoreServiceRepository.findServiceById(id);
        
        if (existingService) {
            return await StoreServiceRepository.updateService(id, restOfData);
        }
    }

    // If no ID was passed, OR the ID wasn't found in the database, create it
    return await StoreServiceRepository.createService(serviceData);
}