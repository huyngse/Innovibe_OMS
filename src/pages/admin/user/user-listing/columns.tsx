import { User } from "@/types/user"
import { ColumnDef } from "@tanstack/react-table"
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "fullName",
    header: "Họ và tên",
  },
  {
    accessorKey: "phoneNumber",
    header: "Số điện thoại",
  },
  {
    accessorKey: "phoneNumber",
    header: "Số điện thoại",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
]
