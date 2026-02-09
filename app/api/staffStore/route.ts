import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

type POST_Request = {
  staffId: string
}

export async function POST(request: Request) {
  const body = (await request.json()) as POST_Request
  const { staffId } = body

  const stores = await prisma.storeStaff.findMany({
    where: {
      userId: staffId,
    },
    include: {
      store: true,
    },
  });

  const flattened = stores.map(({ store: { id, name, description } }) => ({
    id,
    name,
    description,
  }));

  return NextResponse.json(flattened)
}
