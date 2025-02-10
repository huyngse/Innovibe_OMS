import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleHelp } from "lucide-react";

const StatusInfo = () => {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        <CircleHelp className="p-2 size-8 text-gray-500" />
      </HoverCardTrigger>
      <HoverCardContent className="grid grid-cols-2 w-[800px] gap-5">
        <div>
          <p className="font-semibold">Còn hàng</p>
          <p className="text-sm text-gray-500">
            Sản phẩm có thể mua ngay. Sản phẩm có trong kho và sẵn sàng để vận
            chuyển hoặc nhận tại cửa hàng.
          </p>
        </div>
        <div>
          <p className="font-semibold">Hết hàng</p>
          <p className="text-sm text-gray-500">
            Sản phẩm hiện không có sẵn để mua. Sản phẩm không có trong kho và
            không có ngày dự kiến ​​sẽ được bổ sung hàng.
          </p>
        </div>
        <div>
          <p className="font-semibold">Đang chờ</p>
          <p className="text-sm text-gray-500">
            Sản phẩm hiện chưa có sẵn để bán nhưng dự kiến ​​sẽ sớm có hàng.
            Trạng thái này có thể áp dụng cho các mặt hàng đang được đặt hàng
            hoặc đang được xử lý để có hàng.
          </p>
        </div>
        <div>
          <p className="font-semibold">Đang vận chuyển</p>
          <p className="text-sm text-gray-500">
            Sản phẩm đã được đặt hàng và đang trên đường đến nhà bán lẻ hoặc
            kho. Sản phẩm hiện chưa có sẵn để bán vì vẫn đang trong quá trình
            vận chuyển.
          </p>
        </div>
        <div>
          <p className="font-semibold">Ngừng sản xuất</p>
          <p className="text-sm text-gray-500">
            Sản phẩm không còn được sản xuất hoặc chào bán nữa. Sản phẩm sẽ
            không được bổ sung hàng trong tương lai và thường sẽ bị xóa khỏi
            kho.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default StatusInfo;
