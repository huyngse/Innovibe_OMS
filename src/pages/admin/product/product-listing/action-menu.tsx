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
import { toast } from "sonner";
import DeleteProductDialog from "../delete-product-dialog";

const ActionMenu = ({ product }: { product: Product }) => {
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
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
                <DropdownMenuItem>Còn hàng</DropdownMenuItem>
                <DropdownMenuItem>Hết hàng</DropdownMenuItem>
                <DropdownMenuItem>Đang vận chuyển</DropdownMenuItem>
                <DropdownMenuItem>Đợi duyệt</DropdownMenuItem>
                <DropdownMenuItem>Ngừng kinh doanh</DropdownMenuItem>
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
