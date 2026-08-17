import { generateReviewState } from "@/features/booking/services";
import { ReviewSchema } from "@/features/booking/validation";
import { NextResponse } from "next/server";
import z from "zod";

type POST_Request = {
  anchor: string;
  store: string;
  staff: string;
  dateTime: string;
  services: string;
}

export async function POST(request: Request) {
    try {
        const body = await (request.json()) as POST_Request

        const parsed = ReviewSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: z.treeifyError(parsed.error) },
                {status: 400}
            )
        }

        const { error, data } = await generateReviewState(body)

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