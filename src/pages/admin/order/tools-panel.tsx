import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const ToolsPanel = () => {
  return (
    <div className="py-3">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Input
            placeholder="Tìm kiếm theo tên hoặc email khách hàng"
            className="w-[300px]"
          />
          <Button>
            <Search />
          </Button>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <Filter />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[500px]">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Lọc kết quả</h4>
                <p className="text-sm text-muted-foreground">
                  Tùy chỉnh việc hiển thị các đơn hàng
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-start gap-4">
                  <Label>Trạng thái đơn hàng</Label>
                  <div className="col-span-2 gap-3 grid grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-Pending" checked />
                      <label
                        htmlFor="status-Pending"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Chờ thanh toán
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-Processing" checked />
                      <label
                        htmlFor="status-Processing"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Chuẩn bị hàng
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-Shipped" checked />
                      <label
                        htmlFor="status-Shipped"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Đang vận chuyển
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-Delivered" checked />
                      <label
                        htmlFor="status-Delivered"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Đã nhận hàng
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-Cancelled" checked />
                      <label
                        htmlFor="status-Cancelled"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Đã hủy
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-Returned" checked />
                      <label
                        htmlFor="status-Returned"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Trả hàng/Hoàn tiền
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label>Trong khoảng thời gian</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="">
                      <SelectValue placeholder="Chọn khoảng thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="today">Hôm nay</SelectItem>
                      <SelectItem value="this-week">Tuần này</SelectItem>
                      <SelectItem value="this-month">Tháng này</SelectItem>
                      <SelectItem value="this-year">Năm nay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label>Danh mục</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="today">Guitar điện</SelectItem>
                      <SelectItem value="this-week">Guitar Bass</SelectItem>
                      <SelectItem value="this-month">Guitar Acoustic</SelectItem>
                      <SelectItem value="this-year">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Lọc</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ToolsPanel;
