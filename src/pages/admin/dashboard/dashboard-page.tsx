import Header from "@/components/header";
import Overview from "./overview";
import Revenue from "./revenue";
import BestSelling from "./best-selling";
import useDashboardStore from "@/stores/use-dashboard-store";
import { useEffect } from "react";
import Loader from "@/components/loader";
import OrderStatusChart from "./order-status-chart";

const DashboardPage = () => {
  const dashboardStore = useDashboardStore();

  useEffect(() => {
    dashboardStore.fetchDashboardData();
  }, []);

  if (dashboardStore.loading) {
    return <Loader />;
  }

  return (
    <div>
      <Header title="Tổng quan" href="/" currentPage="Dashboard" />
      <div className="grid grid-cols-12 gap-5 p-5">
        <Overview />
        <Revenue />
        <div className="col-span-4 flex flex-col gap-3">
          <OrderStatusChart />
          <BestSelling />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
