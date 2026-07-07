import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getDatetimeService } from "../services/dateTime.services";


export const getDatetime = createSafeAction(
    {},
    getDatetimeService
)