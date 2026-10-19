import { serviceSchemaType } from "@/domains/service/validation/service.schema";
import { ServiceRepository } from "./offering.repositories";

export async function editOfferingService (serviceId: string, updatedData: serviceSchemaType) {
    await ServiceRepository.editService(serviceId, updatedData)
} 

export async function deleteOfferingService (serviceId: string) {
    await ServiceRepository.deleteService(serviceId)
} 