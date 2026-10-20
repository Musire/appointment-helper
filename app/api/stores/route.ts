import { getActiveStores } from "@/domains/store/store.queries";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { error, data } = await getActiveStores()

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