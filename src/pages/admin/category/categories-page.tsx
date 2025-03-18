import Header from "@/components/header";
import ToolsPanel from "./tools-panel";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useCategoryStore from "@/stores/use-category-store";
import { useEffect } from "react";
import Loader from "@/components/loader";

const CategoriesPage = () => {
  const categoryStore = useCategoryStore();
  useEffect(() => {
    categoryStore.fetchCategories();
  }, []);
  if (categoryStore.loading) return <Loader />;
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách danh mục hàng hóa"
      />
      <div className="p-5 flex-1 overflow-auto">
        <ToolsPanel />
        <DataTable columns={columns} data={categoryStore.categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
