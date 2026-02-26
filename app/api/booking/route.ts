import { createBooking } from "@/domains/booking/services/booking.services";
import { NextResponse } from "next/server"

type POST_input = {
    storeId: string;
    staffId: string;
    userId: string;
    startTime: string;
    serviceIds: string[];
}

export async function POST(request: Request) {
    try {
        const body = await(request.json()) as POST_input
        const { error, data } = await createBooking(body)
        
        if (error) {
            return NextResponse.json({ data: null, error: error}, { status: 400 })
        }

        return NextResponse.json(data)
        
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'INTERNAL_ERROR' },
            { status: 500}
        )
    }
}