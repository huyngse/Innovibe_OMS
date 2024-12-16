import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import productData from "@/data/products.json";
import { Product } from "@/types/product";
const ProductsPage = () => {
  const data = productData as Product[];
  return (
    <div>
      <Header title="Tổng quan" href="/" currentPage="Danh sách sản phẩm" />
      <div className="p-5">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ProductsPage;
