import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/types/product";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteProductDialog from "../delete-product-dialog";
import { updateProductStatus } from "@/lib/api/product-api";
import { toast } from "react-toastify";
import useProductStore from "@/stores/use-product-store";

const ActionMenu = ({ product }: { product: Product }) => {
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const productStore = useProductStore();
  const handleUpdateStatus = async (
    status:
      | "In Stock"
      | "Out of Stock"
      | "Pending"
      | "In Transit"
      | "Discontinued"
  ) => {
    const result = await updateProductStatus(product.productId, status);
    if (result.error) {
      toast.error("Cập nhật sản phẩm thất bại", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success("Cập nhật sản phẩm thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        productStore.rerender();
      }, 100);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(product.productId.toString());
              toast("Đã sao chép.");
            }}
          >
            Sao chép ID sản phẩm
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={`/product/${product.productId}`}>
              Xem chi tiết sản phẩm
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to={`/product/${product.productId}/edit`}>
              Cập nhật sản phẩm
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Thay đổi trạng thái</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => handleUpdateStatus("In Stock")}
                >
                  Còn hàng
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleUpdateStatus("Out of Stock")}
                >
                  Hết hàng
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleUpdateStatus("In Transit")}
                >
                  Đang vận chuyển
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus("Pending")}>
                  Đợi duyệt
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleUpdateStatus("Discontinued")}
                >
                  Ngừng kinh doanh
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => {
              setopenDeleteDialog(true);
            }}
          >
            Xóa sản phẩm
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteProductDialog
        product={product}
        open={openDeleteDialog}
        setOpen={setopenDeleteDialog}
      />
    </>
  );
};

export default ActionMenu;
