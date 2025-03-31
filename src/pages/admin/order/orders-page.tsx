import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ToolsPanel from "./tools-panel";
import useOrderStore from "@/stores/use-order-store";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { orderStatus } from "@/constants/order-status";
import { cn } from "@/lib/utils";
const OrdersPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const orderStore = useOrderStore();
  useEffect(() => {
    orderStore.fetchOrders();
  }, [orderStore.renderKey]);

  if (orderStore.loading) return <Loader />;
  const filteredOrders = orderStore.orders.filter(order => order.orderStatus == selectedStatus);
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách đơn hàng" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolsPanel />
        <div className="overflow-auto flex my-3">
          <Button
            onClick={() => {
              setSelectedStatus("All");
            }}
            className={cn(
              "px-5 rounded-none",
              selectedStatus == "All" &&
                "bg-orange-500 hover:bg-orange-400 hover:text-white text-white"
            )}
            variant={"outline"}
          >
            Tất cả ({orderStore.orders.length})
          </Button>
          {orderStatus.map((item, index: number) => {
            const numOfOrders = orderStore.orders.filter(
              (order) => order.orderStatus == item.value
            ).length;
            return (
              <Button
                key={index}
                onClick={() => {
                  setSelectedStatus(item.value);
                }}
                className={cn(
                  "px-5 rounded-none",
                  selectedStatus == item.value &&
                    "bg-orange-500 hover:bg-orange-400 hover:text-white text-white"
                )}
                variant={"outline"}
              >
                {item.label}
                {numOfOrders > 0 && ` (${numOfOrders})`}
              </Button>
            );
          })}
        </div>
        <DataTable columns={columns} data={selectedStatus == "All" ? orderStore.orders : filteredOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
