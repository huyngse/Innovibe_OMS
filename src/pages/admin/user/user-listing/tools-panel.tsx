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
const ToolsPanel = () => {
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
            <SelectValue placeholder="Vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="*">Tất cả</SelectItem>
            <SelectItem value="Customer">Khách hàng</SelectItem>
            <SelectItem value="Staff">Nhân viên</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 flex">
        <Link to={"/create-user"} className="w-full">
          <Button className="w-full flex gap-3 items-center">
            <Plus />
            Tạo mới
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolsPanel;
