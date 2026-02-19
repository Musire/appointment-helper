import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


type POST_Request = {
  userId: string
}

export async function POST(request: Request) {
  const body = await (request.json()) as POST_Request
  const { userId } = body
  
  const found = await prisma.staffProfile.findUnique({
    where: { userId },
    select: {
      id: true,
      bio: true,
      user: {
        select: {
          fullName: true
        }
      }
    }
  })


  return NextResponse.json(found)
  
}