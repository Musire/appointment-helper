import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

type POST_Request = {
  storeId: string
}

export async function POST(request: Request) {
    const body = (await request.json()) as POST_Request
    const { storeId } = body


    const store = await prisma.storeConfig.findUnique({
        where: {
            storeId
        }
    })

    return NextResponse.json(store)    
}
