import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface MemberEditModalProps {
  params: {
    id: string;
  };
}
const MemberEditModal = ({ params }: MemberEditModalProps) => {
  console.log("params", params);

  return (
    <Modal>
      <DialogHeader className="text-left">
        <DialogTitle>Edit Member</DialogTitle>
        <DialogDescription>
          {/* Suggest a description */}
          Change the details of this user below, and submit the form to save
          changes.
        </DialogDescription>
      </DialogHeader>

      <div className="pt-4"></div>

      <DialogFooter className="flex flex-row justify-end gap-1 pt-3">
        <Button size={"sm"} type="button" variant="outline">
          Cancel
        </Button>
        <Button size={"sm"}>Save changes</Button>
      </DialogFooter>
    </Modal>
  );
};

export default MemberEditModal;
