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

  });
  if (dbuser) {
    let result = {
      id: userId,
      username: dbuser.username,
      firstName: dbuser.first_name,
      lastName: dbuser.last_name,
      email: dbuser.email,
      role: dbuser.role,
    };

    return result;
  }

  return null;
};
