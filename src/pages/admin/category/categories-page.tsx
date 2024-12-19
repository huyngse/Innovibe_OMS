import Header from "@/components/header";
import ToolsPanel from "./tools-panel";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import cateogies from "@/data/categories.json";
import { Category } from "@/types/category";
const CategoriesPage = () => {
  const data = cateogies as Category[];
  return (
    <div>
      <Header title="Tổng quan" href="/" currentPage="Danh sách danh mục hàng hóa" />
      <div className="p-5">
        <ToolsPanel />
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default CategoriesPage;
