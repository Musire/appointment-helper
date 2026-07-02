import { generateReviewState } from "@/domains/booking/services/review.services";
import { ReviewSchema } from "@/domains/booking/validation/review.validation";
import { quickParse } from "@/lib/utils/parseSchema";
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

        const parsed = quickParse(ReviewSchema, body)

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