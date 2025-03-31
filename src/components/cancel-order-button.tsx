import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { updateOrderStatus } from "@/lib/api/order-api";
  import useOrderStore from "@/stores/use-order-store";
  import { Order } from "@/types/order";
  import { LoaderIcon } from "lucide-react";
  import { useState } from "react";
  import { toast } from "react-toastify";
  
  const CancelOrderButton = ({ order }: { order: Order }) => {
    const [submitting, setSubmitting] = useState(false);
    const orderStore = useOrderStore();
    const handleCancelOrder = async () => {
      setSubmitting(true);
      const result = await updateOrderStatus(order.orderId, "Cancelled");
      setSubmitting(false);
      if (result.error) {
        toast.error("Hủy đơn hàng thất bại", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Hủy đơn hàng thành công", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        orderStore.rerender();
      }
    };
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={"outline"} disabled={submitting}>
            {submitting ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Hủy Đơn Hàng"
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc chắn muốn hủy đơn hàng này
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelOrder}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default CancelOrderButton;