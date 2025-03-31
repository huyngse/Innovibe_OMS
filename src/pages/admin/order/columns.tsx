import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrencyVND } from "@/lib/currency";
import { formatDateTime } from "@/lib/datetime";
import { Order } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { orderStatus } from "@/constants/order-status";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Order>[] = [
  // {
  //   accessorKey: "orderNumber",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         className="p-0 m-0 w-full justify-start"
  //       >
  //         Mã đơn hàng
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const order = row.original;
  //     return (
  //       <Link to={`/order/${order.orderId}`} className="font-semibold">
  //         {order.orderNumber}
  //       </Link>
  //     );
  //   },
  // },
  {
    accessorKey: "accountFullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Khách hàng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div>
          <p className="font-semibold">{order.accountFullName}</p>
          <p>{order.email ? order.email : "Không có email"}</p>
          <p>{order.phone ? order.phone : "Không có số điện thoại"}</p>
        </div>
      );
    },
  },
  {
    id: "orderItems",
    header: "Sản phẩm",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col gap-2">
          {order.orderItems.map((item) => {
            return (
              <div key={item.productId} className="flex gap-2">
                <img
                  src={item.images[0].imageURL}
                  alt=""
                  className="size-6 object-contain bg-white drop-shadow rounded"
                />
                <p className="font-semibold">
                  {item.name} (x{item.quantity})
                </p>
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Tổng đơn hàng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      return <div>{formatCurrencyVND(order.total)}</div>;
    },
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Ngày đặt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      return <div>{formatDateTime(new Date(order.orderDate))}</div>;
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
      const order = row.original;
      let status =
        orderStatus.find((i) => i.value == order.orderStatus)?.label ??
        order.orderStatus;
      if (order.orderStatus == "Cancelled") {
        return (
          <Badge className="text-gray-500 bg-gray-100 border-gray-500 hover:bg-gray-200">
            {status}
          </Badge>
        );
      }
      if (order.orderStatus == "Delivered") {
        return (
          <Badge className="text-green-500 bg-green-100 border-green-500 hover:bg-green-200 text-center">
            {status}
          </Badge>
        );
      }
      if (order.orderStatus == "Pending") {
        return (
          <Badge className="text-yellow-500 bg-yellow-100 border-yellow-500 hover:bg-yellow-200 text-center">
            {status}
          </Badge>
        );
      }
      if (order.orderStatus == "Processing") {
        return (
          <Badge className="text-purple-500 bg-purple-100 border-purple-500 hover:bg-purple-200 text-center">
            {status}
          </Badge>
        );
      }
      if (order.orderStatus == "Returned") {
        return (
          <Badge className="text-orange-500 bg-orange-100 border-orange-500 hover:bg-orange-200 text-center">
            {status}
          </Badge>
        );
      }
      if (order.orderStatus == "Shipped") {
        return (
          <Badge className="text-blue-500 bg-blue-100 border-blue-500 hover:bg-blue-200 text-center">
            {status}
          </Badge>
        );
      }
      return <div>{status}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

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
              onClick={() => {
                navigator.clipboard.writeText(order.orderId.toString());
                toast("Đã sao chép.");
              }}
            >
              Sao chép mã đơn hàng
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link to={`/order/${order.orderId}`}>
              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => {
                console.log(order.orderId);
              }}
            >
              Xóa đơn hàng
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
