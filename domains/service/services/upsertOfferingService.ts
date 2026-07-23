import { StoreServiceRepository } from "@/features/booking/respositories/StoreServiceRepository";
import { serviceSchemaType } from "../validation/service.schema";


export async function upsertOfferingService (serviceData: serviceSchemaType) {
    return StoreServiceRepository.upsertOfferings(serviceData)
}