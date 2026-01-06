'use server';

import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/safeAction";
import { CategoryCreationSchema, CategoryCreationType } from "@/validation/Category.schema";


export async function createCategory (formData: CategoryCreationType) {
    return safeAction(async() => {
        const parsed = CategoryCreationSchema.safeParse(formData)
        
        if (!parsed.success) {
            throw new Error(parsed.error.issues[0].message);
        }

        const { name, storeId } = parsed.data

        await prisma.serviceCategory.create({
            data: {
                storeId,
                name
            }
        })
    }, ['ADMIN'])
}