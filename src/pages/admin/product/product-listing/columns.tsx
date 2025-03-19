import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { Product } from "@/types/product";
import ActionMenu from "./action-menu";
export const columns: ColumnDef<Product>[] = [
  {
    header: "Hình ảnh",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div>
          <img
            src={product.images[0].imageURL}
            alt=""
            className="size-10 object-cover rounded"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Tên sản phẩm
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Link
          to={`/product/${product.productId}`}
          className="font-semibold hover:text-blue-400 duration-75"
        >
          {product.name}
        </Link>
      );
    },
  },
  {
    id: "categoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Danh mục
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (value) => value.category.name,
  },
  {
    id: "brandName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Thương hiệu
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (value) => value.brand.name,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          s.lg tồn kho
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
      } else if (product.status == "Discontinued") {
        badge = (
          <Badge className="bg-blue-100 border border-gray-500 text-gray-500 hover:bg-gray-200">
            Ngừng kinh doanh
          </Badge>
        );
      } else if (product.status == "Pending") {
        badge = (
          <Badge className="bg-blue-100 border border-yellow-500 text-yellow-500 hover:bg-yellow-200">
              Đợi duyệt
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
      return <ActionMenu product={product} />;
    },
  },
];
