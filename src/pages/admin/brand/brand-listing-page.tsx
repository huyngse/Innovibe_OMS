import Header from "@/components/header";
import ToolsPanel from "./tools-panel";
import { DataTable } from "./data-table";
import { columns } from "./column";
import useBrandStore from "@/stores/use-brand-store";
import { useEffect } from "react";
import Loader from "@/components/loader";
const BrandListingPage = () => {
  const brandStore = useBrandStore();
  useEffect(() => {
    brandStore.fetchBrands();
  }, []);

  if (brandStore.loading) return <Loader />;
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách danh mục hàng hóa"
      />
      <div className="p-5 flex-1 overflow-auto">
        <ToolsPanel />
        <DataTable columns={columns} data={brandStore.brands} />
      </div>
    </div>
  );
};

export default BrandListingPage;
