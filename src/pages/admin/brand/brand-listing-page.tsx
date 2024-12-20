import Header from "@/components/header";
import ToolsPanel from "./tools-panel";
import { DataTable } from "./data-table";
import { columns } from "./column";
import brands from "@/data/brands.json";
import { Brand } from "@/types/brand";
const BrandListingPage = () => {
  const data = brands as Brand[];
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách danh mục hàng hóa"
      />
      <div className="p-5 flex-1 overflow-auto">
        <ToolsPanel />
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default BrandListingPage;
