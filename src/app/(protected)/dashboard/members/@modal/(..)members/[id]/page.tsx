import EditForm from "@/components/dashboard/members/EditForm";
import Modal from "@/components/shared/Modal";
import db from "@/prisma";
import { clerkClient } from "@clerk/nextjs";

interface MemberEditModalProps {
  params: {
    id: string;
  };
}
const MemberEditModal = async ({ params }: MemberEditModalProps) => {
  let user = await clerkClient.users.getUser(params.id);
  let dbUser = await db.user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!user || !dbUser) {
    return null;
  }

  return (
    <Modal>
      <EditForm userId={user.id} />
    </Modal>
  );
};

export default MemberEditModal;
