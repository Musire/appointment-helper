import { getStoreStaff } from "@/domains/booking/services/staff.services";
import { NextResponse } from "next/server";

type POST_request = {
  storeId: string;
}

export async function POST(request: Request) {
  try {
    const body = await (request.json()) as POST_request
    const { error, data } = await getStoreStaff(body.storeId)
    
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