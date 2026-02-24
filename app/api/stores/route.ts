import { getStores } from "@/domains/booking/services/store.services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { error, data } = await getStores()

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