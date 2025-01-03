import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { orderStatus } from "@/constants/order-status";
import { formatCurrencyVND } from "@/lib/currency";
import { formatDateTime } from "@/lib/datetime";
import { Order } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Mã đơn hàng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Link to={`/order/${order.id}`} className="font-semibold">
          {order.orderId}
        </Link>
      );
    },
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Tên khách hàng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "totals",
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
      const subtotal = order.items.reduce(
        (accumlator, currentValue) =>
          accumlator + currentValue.price * currentValue.quantity,
        0
      );
      const total = subtotal + order.shippingFee;
      return <div>{formatCurrencyVND(total)}</div>;
    },
    sortingFn: (rowA, rowB) => {
      const totalA =
        rowA.original.items.reduce(
          (accumlator, currentValue) =>
            accumlator + currentValue.price * currentValue.quantity,
          0
        ) + rowA.original.shippingFee;
      const totalB =
        rowB.original.items.reduce(
          (accumlator, currentValue) =>
            accumlator + currentValue.price * currentValue.quantity,
          0
        ) + rowB.original.shippingFee;
      return totalA - totalB;
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
        orderStatus.find((i) => i.value == order.status)?.label ?? order.status;
      if (order.status == "Cancelled") {
        return (
          <Badge className="text-gray-500 bg-gray-100 border-gray-500 hover:bg-gray-200">
            {status}
          </Badge>
        );
      }
      if (order.status == "Delivered") {
        return (
          <Badge className="text-green-500 bg-green-100 border-green-500 hover:bg-green-200">
            {status}
          </Badge>
        );
      }
      if (order.status == "Pending") {
        return (
          <Badge className="text-yellow-500 bg-yellow-100 border-yellow-500 hover:bg-yellow-200">
            {status}
          </Badge>
        );
      }
      if (order.status == "Processing") {
        return (
          <Badge className="text-purple-500 bg-purple-100 border-purple-500 hover:bg-purple-200">
            {status}
          </Badge>
        );
      }
      if (order.status == "Returned") {
        return (
          <Badge className="text-orange-500 bg-orange-100 border-orange-500 hover:bg-orange-200">
            {status}
          </Badge>
        );
      }
      if (order.status == "Shipped") {
        return (
          <Badge className="text-blue-500 bg-blue-100 border-blue-500 hover:bg-blue-200">
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
              onClick={() =>
                navigator.clipboard.writeText(order.orderId.toString())
              }
            >
              Sao chép mã đơn hàng
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link to={`/order/${order.id}`}>
              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => {
                console.log(order.id);
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
