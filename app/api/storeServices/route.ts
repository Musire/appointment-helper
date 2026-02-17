import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


type POST_Request = {
  storeId: string
}

export async function POST(request: Request) {
    const body = await (request.json()) as POST_Request
    const { storeId } = body
    
    const serviceCategories = await prisma.serviceCategory.findMany({
        where: {
            storeId
        },
        select: {
            services: {
                select: {
                    id: true,
                    name: true,
                    durationMin: true,
                    priceCents: true
                }
            }
        }
    })

    const flattened = serviceCategories.flatMap(item => item.services)

    return NextResponse.json(flattened)
}