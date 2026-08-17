import { retrieveStaffStore } from "@/features/booking/services";
import { StoreStaffSchema } from "@/features/booking/validation";
import { NextResponse } from "next/server";
import z from "zod";

type POST_Request = {
    storeId: string;
}

export async function POST(request: Request) {
    try {
        const body = await(request.json()) as POST_Request
        const parsed = StoreStaffSchema.safeParse(body)
        
        if (!parsed.success) {
            return NextResponse.json(
                { error: z.treeifyError(parsed.error) },
                { status: 400 }
            )
        }

        const { success, error, data } = await retrieveStaffStore(parsed.data.storeId)

        if (!success) {
            return NextResponse.json({ error: error}, { status: 400 })
        }

        return NextResponse.json(data)
        
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'INTERNAL_ERROR' },
            { status: 500 }
        )
    }
}