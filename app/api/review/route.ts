import { generateReviewState } from "@/domains/booking/review.services";
import { ReviewSchema } from "@/domains/booking/review.validation";
import { quickParse } from "@/lib/helpers/parseSchema";
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
                { status: 400, error: z.treeifyError(parsed.error) }
            )
        }

        const { error, data } = await generateReviewState(body)

        if (error) {
            NextResponse.json({ status: 400, data: null, error: error})
        }

        return NextResponse.json(data)
        
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { status: 400, error: 'INTERNAL_ERROR' }
        )
    }
}