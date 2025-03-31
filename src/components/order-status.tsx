import { cn } from "@/lib/utils";
import {
  Check,
  CircleDollarSign,
  ClipboardList,
  Truck,
  XIcon,
} from "lucide-react";

const OrderStatus = ({ status }: { status: string }) => {
  const stages = [
    {
      value: "Pending",
      label1: "Đợi thanh toán",
      label2: "Đặt hàng thành công",
      icon: CircleDollarSign,
    },
    {
      value: "Processing",
      label1: "Đang chuẩn bị hàng",
      label2: "Đã giao cho vận chuyển",
      icon: ClipboardList,
    },
    {
      value: "Shipped",
      label1: "Đang giao hàng",
      label2: "Đã giao hàng",
      icon: Truck,
    },
    {
      value: "Delivered",
      label1: "Hoàn tất đơn hàng",
      label2: "Hoàn tất đơn hàng",
      icon: Check,
    },
  ];
  const stageIndex = stages.findIndex((i) => i.value == status);
  if (status == "Cancelled") {
    return (
      <div className="px-3 py-5 flex flex-col items-center justify-center gap-2 bg-red-100 border-b-2 border-red-500">
        <XIcon className="border-2 border-red-500 size-10 p-2 rounded-full text-red-500"/>
        <p className="text-red-500 font-semibold">Đã hủy đơn hàng</p>
      </div>
    );
  }
  if (stageIndex == -1) return <p>Invalid status</p>;
  return (
    <div className="p-3">
      <ul className="flex justify-between">
        {stages.map((stage, index) => (
          <li
            key={index}
            className={cn(
              "flex-1 border-b-2 py-2 bg-gray-50",
              index <= stageIndex &&
                "text-green-500 border-green-500 bg-green-50",
              index == stageIndex && "border-b-4 bg-green-100"
            )}
          >
            <div className="flex justify-center">
              <stage.icon
                className={cn(
                  "border-2 border-black size-10 p-2 rounded-full",
                  index < stageIndex && "border-green-500",
                  index == stageIndex &&
                    "bg-green-500 text-white border-green-500"
                )}
              />
            </div>
            <p className="text-center font-semibold">
              {index >= stageIndex ? stage.label1 : stage.label2}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderStatus;