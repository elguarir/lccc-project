import db from "@/prisma";
import { auth } from "@clerk/nextjs";

export const useCurrentUser = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const dbuser = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  });
  if (dbuser) {
    let result = {
      id: userId,
      username: dbuser.username,
      email: dbuser.email,
      role: dbuser.role,
      profile: dbuser.profile,
    };

    return result;
  }

  return null;
};
