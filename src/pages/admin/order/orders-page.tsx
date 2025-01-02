import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { guitarOrders } from "@/data/order";
import { Order } from "@/types/order";
const OrdersPage = () => {
  const data = guitarOrders as Order[];
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách đơn hàng" />
      <div className="p-5 flex-1 overflow-auto">
        {/* <ToolsPanel /> */}
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default OrdersPage;
