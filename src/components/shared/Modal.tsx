"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";

interface ModalProps {
  children: ({ handleClose }: { handleClose: () => void }) => React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const handleClose = () => router.back();
  return (
    <Dialog modal defaultOpen onOpenChange={handleClose}>
      <DialogContent className="max-md:w-[95%]">
        {children({handleClose})}
      </DialogContent>
    </Dialog>
  );
}
