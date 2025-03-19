import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import ToolPanel from "./tool-panel";
import useProductStore from "@/stores/use-product-store";
import { useEffect } from "react";
import Loader from "@/components/loader";
const ProductsPage = () => {
  const productStore = useProductStore();
  useEffect(() => {
    productStore.fetchProducts();
  }, [productStore.renderKey]);

  if (productStore.loading) return <Loader />;
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách sản phẩm" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel />
        <DataTable columns={columns} data={productStore.products} />
      </div>
    </div>
  );
};

export default ProductsPage;
