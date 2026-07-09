import { StaffRepository } from "../repositories/StaffRepository";


export function getAvailableStaffService (storeId: string) {
    return StaffRepository.getAvailableStaff(storeId)
}