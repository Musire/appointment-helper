import { getServices } from "@/domains/booking/services/storeService.services";
import { NextResponse } from "next/server";

type POST_Request = {
  storeId: string
}

export async function POST(request: Request) {
    try {
        const body = await (request.json()) as POST_Request
        const { storeId } = body
        
        const { data, error } = await getServices(storeId)

        if (error) {
            return NextResponse.json({ data: null, error: error}, { status: 400 })
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