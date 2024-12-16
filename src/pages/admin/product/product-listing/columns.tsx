import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
export const columns: ColumnDef<Product>[] = [
  {
    header: "Hình ảnh",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div>
          <img src={product.productImages[0].imageUrl} alt="" className="size-10 object-cover rounded"/>
        </div>
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Tên sản phẩm",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Link
          to={`/product/${product.id}`}
          className="font-semibold hover:text-blue-400 duration-75"
        >
          {product.productName}
        </Link>
      );
    },
  },
  {
    accessorKey: "categoryName",
    header: "Danh mục",
  },
  {
    accessorKey: "brandName",
    header: "Thương hiệu",
  },
  {
    accessorKey: "stockQuantity",
    header: "s.lg tồn kho",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const product = row.original;
      let badge: ReactNode = <Badge>{product.status}</Badge>;
      if (product.status == "In Stock") {
        badge = (
          <Badge className="bg-green-100 border border-green-500 text-green-500 hover:bg-green-200">
            Còn Hàng
          </Badge>
        );
      } else if (product.status == "Out of Stock") {
        badge = (
          <Badge className="bg-red-100 border border-red-500 text-red-500 hover:bg-red-200">
            Hết Hàng
          </Badge>
        );
      } else if (product.status == "In Transit") {
        badge = (
          <Badge className="bg-blue-100 border border-blue-500 text-blue-500 hover:bg-blue-200">
            Đang Vận Chuyển
          </Badge>
        );
      }
      return <div>{badge}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
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
              onClick={() =>
                navigator.clipboard.writeText(product.id.toString())
              }
            >
              Sao chép ID sản phẩm
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/product/${product.id}`}>Xem chi tiết sản phẩm</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/product/${product.id}/edit`}>Cập nhật sản phẩm</Link>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Thay đổi trạng thái
              </DropdownMenuSubTrigger>
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
            <DropdownMenuItem className="text-red-500">
              Xóa sản phẩm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
