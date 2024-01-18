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
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      username: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      avatar_url: true,
      profile: {
        select: {
          bio: true,
          facebook: true,
          twitter: true,
          instagram: true,
          github: true,
          website: true,
        },
      },
    },
  });
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user });
}
