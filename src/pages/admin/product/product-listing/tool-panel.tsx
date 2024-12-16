import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const ToolPanel = () => {
  return (
    <div className="grid grid-cols-12 pb-5 gap-5">
      <div className="col-span-4 flex gap-3">
        <Input placeholder="Nhập để tìm kiếm" />
        <Button>
          <Search />
        </Button>
      </div>
      <div className="col-span-3"></div>
      <div className="col-span-3">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="*">Tất cả</SelectItem>
            <SelectItem value="In Stock">Còn hàng</SelectItem>
            <SelectItem value="Out of Stock">Hết hàng</SelectItem>
            <SelectItem value="In Transit">Đang vận chuyển</SelectItem>
            <SelectItem value="Pending">Đợi duyệt</SelectItem>
            <SelectItem value="Discontinued">Ngừng kinh doanh</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 flex">
        <Link to={'/product/create'} className="w-full">
          <Button className="w-full flex gap-3 items-center">
            <Plus />
            Tạo mới
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolPanel;
