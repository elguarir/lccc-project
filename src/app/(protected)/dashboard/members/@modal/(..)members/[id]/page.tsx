import EditForm from "@/components/dashboard/members/EditForm";
import Modal from "@/components/shared/Modal";
import { formSchema } from "@/lib/validators/UserEditValidator";
import db from "@/prisma";
import { clerkClient } from "@clerk/nextjs";
import { unstable_cache as cachedFn } from "next/cache";

export const dynamic = "force-dynamic";

interface MemberEditModalProps {
  params: {
    id: string;
  };
}
const MemberEditModal = async ({ params }: MemberEditModalProps) => {
  let user = await clerkClient.users.getUser(params.id);

  if (!user) {
    return null;
  }

  let res = await getCachedUser(user.id);
  if (!res) {
    return null;
  }
  return (
    <Modal>
      <EditForm user={res} userId={user.id} />
    </Modal>
  );
};

export default MemberEditModal;

const getCachedUser = cachedFn(
  async (id) => {
    let user = await clerkClient.users.getUser(id);
    let dbUser = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user || !dbUser) {
      return null;
    }

    let res = formSchema.parse({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: dbUser.role,
    });

    return res;
  },
  ["user-details"],
);
