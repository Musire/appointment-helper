import { serviceSchemaType } from "@/domains/service/validation/service.schema";
import { ServiceRepository } from "../repository/ServiceRepository";

export async function editSS (serviceId: string, updatedData: serviceSchemaType) {
    await ServiceRepository.editService(serviceId, updatedData)
} 

export async function deleteSS (serviceId: string) {
    await ServiceRepository.deleteService(serviceId)
} 