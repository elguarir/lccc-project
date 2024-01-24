import EditForm from "@/components/dashboard/members/EditForm";
import Modal from "@/components/shared/Modal";
import { formSchema } from "@/lib/validators/UserEditValidator";
import db from "@/prisma";
import { clerkClient } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";

interface MemberEditModalProps {
  params: {
    id: string;
  };
}
const MemberEditModal = async ({ params }: MemberEditModalProps) => {
  noStore();
  let user = await clerkClient.users.getUser(params.id);
  let dbUser = await db.user.findUnique({
    where: {
      id: params.id,
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

  return (
    <Modal>
      <EditForm user={res} userId={user.id} />
    </Modal>
  );
};

export default MemberEditModal;
