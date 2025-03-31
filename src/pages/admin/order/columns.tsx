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
import { Select, Tag } from "antd";
import { useState } from "react";
import { updateOrderStatus } from "@/lib/api/order-api";

const { Option } = Select;

const statusOptions = {
  Cancelled: { label: "Đã hủy", color: "red" },
  Returned: { label: "Đã trả hàng", color: "orange" },
  Delivered: { label: "Đã giao", color: "blue" },
  Pending: { label: "Chờ thanh toán", color: "orange" },
  Processing: { label: "Chuẩn bị hàng", color: "purple" },
  Shipped: { label: "Đã giao hàng", color: "cyan" },
};

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
                <img src={item.images[0].imageURL} alt="" className="size-6 object-contain bg-white drop-shadow rounded" />
                <p className="font-semibold">{item.name} (x{item.quantity})</p>
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
      // const statusInfo = statusOptions[order.orderStatus as keyof typeof statusOptions];
      const [loading, setLoading] = useState(false);
      const [currentStatus, setCurrentStatus] = useState(order.orderStatus);

      return (
        <Select
          value={currentStatus}
          style={{ width: 150 }}
          loading={loading}
          onChange={async (value: any) => {
            setLoading(true);
            try {
              const response = await updateOrderStatus(order.orderId, value);
              if (response.error === null) {
                toast.success("Cập nhật trạng thái thành công");
                setCurrentStatus(value);
              } else {
                toast.error(response.error || "Lỗi khi cập nhật trạng thái");
              }
            } catch (error) {
              toast.error("Lỗi khi cập nhật trạng thái");
            } finally {
              setLoading(false);
            }
          }}
          optionLabelProp="label"
        >
          {Object.entries(statusOptions).map(([value, { label, color }]) => (
            <Option
              key={value}
              value={value}
              label={
                <Tag
                  color={color}
                  style={{ width: "100%", margin: 0, textAlign: "center" }}
                >
                  {label}
                </Tag>
              }
            >
              <Tag
                color={color}
                style={{
                  width: "100%",
                  margin: 0,
                  padding: "4px 8px",
                  textAlign: "center",
                }}
              >
                {label}
              </Tag>
            </Option>
          ))}
        </Select>
      );
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
