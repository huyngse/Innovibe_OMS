import { Category } from "@/types/category"
import { ColumnDef } from "@tanstack/react-table"

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
  },
  {
    accessorKey: "updatedAt",
    header: "Ngày chỉnh sửa",
  },
]
