"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleClose = () => router.back();
  return (
    <Dialog modal defaultOpen onOpenChange={handleClose}>
      <DialogContent className="max-md:w-[95%]">{children}</DialogContent>
    </Dialog>
  );
}
