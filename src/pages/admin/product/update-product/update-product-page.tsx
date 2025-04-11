import Header from "@/components/header";
import Loader from "@/components/loader";
import useProductStore from "@/stores/use-product-store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DropZone from "./drop-zone";
import UpdateProductForm from "./update-product-form";

const UpdateProductPage = () => {
  const { productId } = useParams();
  const productStore = useProductStore();
  useEffect(() => {
    if (productId) {
      productStore.fetchProduct(parseInt(productId));
    }
  }, [productId]);

  if (productStore.loading) return <Loader />;
  if (productStore.product == null) return;

  return (
    <div className="flex flex-col">
      <Header
        title="Sản phẩm"
        href="/product"
        currentPage="Cập nhật sản phẩm"
      />

      <div className="flex-1 p-5">
        <div className="col-span-2 mb-2">
          {productStore.product && (
            <DropZone productId={productStore.product.productId} />
          )}
        </div>
        {productStore.product && (
          <UpdateProductForm product={productStore.product} />
        )}
      </div>
    </div>
  );
};

export default UpdateProductPage;
