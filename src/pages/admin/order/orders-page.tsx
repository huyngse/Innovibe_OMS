import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ToolsPanel from "./tools-panel";
import useOrderStore from "@/stores/use-order-store";
import { useEffect } from "react";
import Loader from "@/components/loader";
const OrdersPage = () => {
  const orderStore = useOrderStore();
  useEffect(() => {
    orderStore.fetchOrders();
  }, []);

  if (orderStore.loading) return <Loader />;
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách đơn hàng" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolsPanel />
        <DataTable columns={columns} data={orderStore.orders} />
      </div>
    </div>
  );
};

export default OrdersPage;
