// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCurrencyVND } from "@/lib/currency";
import TiptapView from "@/components/tiptap/TiptapView";

import ImageGallery from "./image-gallery";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useProductStore from "@/stores/use-product-store";
import Loader from "@/components/loader";
import GoBackButton from "@/components/go-back-button";
import { PencilLine } from "lucide-react";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const productStore = useProductStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (productId) {
      productStore.fetchProduct(parseInt(productId));
    }
  }, [productId]);

  const handleGoToEdit = () => {
    navigate(`/product/${productStore.product?.productId}/edit`);
  };

  if (productStore.loading) return <Loader />;
  if (productStore.product == null) return;

  return (
    <div className="bg-gray-100 p-5">
      <div className="mb-3 flex justify-between items-center">
        <GoBackButton />
        <button
          onClick={handleGoToEdit}
          className="flex gap-1 items-center font-semibold hover:text-orange-600 duration-200"
        >
          <PencilLine className="size-5 mt-1" />
          Cập nhật thông tin sản phẩm
        </button>
      </div>
      <div className="bg-white rounded p-5">
        <h1 className="text-center font-bold text-2xl mb-5">
          Chi Tiết Sản Phẩm
        </h1>
        <div className="grid grid-cols-2">
          <div className="p-5">
            <p className="font-semibold">Tên sản phẩm</p>
            <h2 className="text-2xl font-semibold mb-2">
              {productStore.product?.name}
            </h2>
            <p className="font-semibold">Trạng thái sản phẩm</p>
            {productStore.product?.status == "Discontinued" ? (
              <p className="text-lg mb-2">Ngừng sản xuất</p>
            ) : productStore.product?.status == "In Stock" ? (
              <p className="text-lg mb-2">Còn hàng</p>
            ) : productStore.product?.status == "In Transit" ? (
              <p className="text-lg mb-2">Đang vận chuyển</p>
            ) : productStore.product?.status == "Out of Stock" ? (
              <p className="text-lg mb-2">Hết hàng</p>
            ) : productStore.product?.status == "Pending" ? (
              <p className="text-lg mb-2">Đợi duyệt</p>
            ) : (
              productStore.product?.status
            )}

            <p className="font-semibold">Giá sản phẩm</p>
            <p className="text-lg">
              {productStore.product?.discount
                ? formatCurrencyVND(productStore.product?.discount)
                : formatCurrencyVND(productStore.product?.price)}
            </p>
            <p className="text-xs line-through decoration-red-500 decoration-1 font-semibold mb-2">
              {productStore.product?.discount != 0 &&
                formatCurrencyVND(productStore.product?.price)}
            </p>
            <p className="font-semibold">Doanh mục sản phẩm</p>
            <p className="text-lg mb-2">
              {productStore.product?.category.name}
            </p>
            <p className="font-semibold">Thương hiệu sản phẩm</p>
            <p className="text-lg mb-2">{productStore.product?.brand.name}</p>
          </div>
          <ImageGallery images={productStore.product?.images} />
        </div>
        <div className="grid grid-cols-12 py-5">
          <div className="col-span-8">
            <h2 className="text-3xl font-extrabold">Mô tả sản phẩm</h2>

            <TiptapView value={productStore.product?.description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
