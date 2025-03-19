import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/lib/api/product-api";
import useProductStore from "@/stores/use-product-store";
import { Product } from "@/types/product";
import { Loader, Trash2 } from "lucide-react";
import { toast } from "sonner";

const DeleteProductDialog = ({
  product,
  open,
  setOpen,
}: {
  product: Product;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const store = useProductStore();

  const handleDelete = async () => {
    toast("Đang xóa", {
      action: <Loader className="animate-spin" />,
    });

    const result = await deleteProduct(product.productId);
    if (result.error) {
      toast("Xóa thất bại", {
        description: result.error,
      });
    } else {
      toast("Xóa thành công");
      setTimeout(() => {
        store.rerender();
      }, 1000);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="size-5 rounded-full p-3 hidden"
          variant={"destructive"}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn hoàn toàn không?</AlertDialogTitle>
          <AlertDialogDescription>
            Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn tài
            khoản của bạn và xóa dữ liệu của bạn khỏi máy chủ của chúng tôi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Tiếp tục</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductDialog;
