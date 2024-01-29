import CategoryForm from "@/components/dashboard/categories/CategoryForm";
import Modal from "@/components/shared/Modal";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { redirect } from "next/navigation";

interface CategoryEditModalProps {
  params: {
    id: string;
  };
}
const CategoryEditModal = async ({ params }: CategoryEditModalProps) => {
  if (!params.id) return redirect("/dashboard/categories");
  return (
    <Modal>
      
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogDescription>
          Edit an existing category, don't forget to save your changes!
        </DialogDescription>
      </DialogHeader>
      <div className="pt-4">
        <CategoryForm mode="edit" categoryId={params.id} />
      </div>
    </Modal>
  );
};

export default CategoryEditModal;
