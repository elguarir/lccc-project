import AddNewDialog from "@/components/dashboard/categories/AddNew";
import CategoriesTable from "@/components/dashboard/categories/CategoriesTable";
import { Button } from "@/components/ui/button";
import { getCategoriesWithArticleCount } from "@/server/routers/category";
import { Plus } from "lucide-react";
import React from "react";

export const metadata = {
  title: "Categories",
  description: "Page for managing categories",
  keywords: ["categories", "management", "dashboard"],
};


const CategoriesPage = async () => {
  let categories = await getCategoriesWithArticleCount()

  return (
    <main className="flex flex-col items-center w-full py-3 md:py-5">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-[550] md:font-semibold text-foreground ">
          Categories
        </h1>
        <AddNewDialog mode="create">
          <Button size={"sm"} className="flex items-center justify-center px-4">
            <span className="mr-2">New</span>
            <Plus className="w-4 h-4" />
          </Button>
        </AddNewDialog>
      </header>
      <CategoriesTable initialData={categories} />
    </main>
  );
};

export default CategoriesPage;

