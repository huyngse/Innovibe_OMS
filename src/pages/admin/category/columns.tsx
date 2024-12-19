import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/datetime";
import { Category } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "categoryName",
    header: "Tên danh mục",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const category = row.original;
      return <div>{formatDate(new Date(category.createdAt))}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Ngày chỉnh sửa",
    cell: ({ row }) => {
      const category = row.original;
      return <div>{formatDate(new Date(category.updatedAt))}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

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
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cập nhật danh mục</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => {
                console.log(category.categoryName);
              }}
            >
              Xóa danh mục
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
