import { StaffRepository } from "./staff.repositories";


export async function getAvailableStaffService (storeId: string) {
    return StaffRepository.getAvailableStaff(storeId)
}