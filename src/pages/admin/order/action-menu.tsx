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
import { updateOrderStatus } from "@/lib/api/order-api";
import useOrderStore from "@/stores/use-order-store";
import { Order } from "@/types/order";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ActionMenu = ({ order }: { order: Order }) => {
  const orderStore = useOrderStore();
  const handleUpdateStatus = async (status: string) => {
    const result = await updateOrderStatus(order.orderId, status);
    if (result.error) {
      toast.error("Cập nhật trạng thái thất bại", {
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
      toast.success("Cập nhật trạng thái thành công", {
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
        orderStore.rerender();
      }, 1000);
    }
  };
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
          <DropdownMenuItem className="cursor-pointer">
            Xem chi tiết
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Cập nhật trạng thái đơn hàng
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => {
                  handleUpdateStatus("Pending");
                }}
              >
                Đợi thanh toán
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleUpdateStatus("Processing");
                }}
              >
                Chuẩn bị hàng
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleUpdateStatus("Shipped");
                }}
              >
                Đang giao hàng
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleUpdateStatus("Delivered");
                }}
              >
                Đã nhận hàng
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleUpdateStatus("Cancelled");
                }}
              >
                Đã hủy
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleUpdateStatus("Returned");
                }}
              >
                Trả hàng
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
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
};

export default ActionMenu;
