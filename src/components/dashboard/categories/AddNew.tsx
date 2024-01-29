import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import CategoryForm from "./CategoryForm";

type Props = {
  mode: "create" | "edit";
  category?: {
    id: string;
    title: string;
    slug: string;
  };
  children?: React.ReactNode;
};

const AddNewDialog = ({ mode, category, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {
              {
                create: "Create Category",
                edit: "Edit Category",
              }[mode]
            }
          </DialogTitle>
          <DialogDescription>
            {
              {
                create:
                  "Create a new category, so the users can add articles to it.",
                edit: "Edit an existing category, don't forget to save your changes!",
              }[mode]
            }
          </DialogDescription>

          <div className="pt-4">
            <CategoryForm mode={mode} categoryId={category?.id} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewDialog;
