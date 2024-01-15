import db from "@/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ user: null });
  }
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  });
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user });
}
