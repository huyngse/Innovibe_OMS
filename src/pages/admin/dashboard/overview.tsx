import { formatCurrencyVND } from "@/lib/currency";
import useDashboardStore from "@/stores/use-dashboard-store";
const Overview = () => {
  const dashboardStore = useDashboardStore();
  if (!dashboardStore.dashboardData) {
    return;
  }
  return (
    <>
      <div className="col-span-3 bg-orange-600 text-white rounded-lg p-3 shadow">
        <h3 className="text-sm">Tổng doanh thu</h3>
        <p className="text-2xl font-bold py-3">
          {formatCurrencyVND(dashboardStore.dashboardData.totalRevenueAllTime)}
        </p>
      </div>
      <div className="col-span-3 bg-green-500 text-white rounded-lg p-3 shadow">
        <h3 className="text-sm">Doanh thu tháng này</h3>
        <p className="text-2xl font-bold py-3">
          {formatCurrencyVND(
            dashboardStore.dashboardData.totalRevenueThisMonth
          )}
        </p>
      </div>
      <div className="col-span-3 bg-blue-500 text-white rounded-lg p-3 shadow">
        <h3 className="text-sm">Tổng đơn hàng</h3>
        <p className="text-2xl font-bold py-3">
          {dashboardStore.dashboardData.totalOrderAllTime}
          <span className="text-base font-semibold"> đơn</span>
        </p>
      </div>
      <div className="col-span-3 bg-purple-500 text-white rounded-lg p-3 shadow">
        <h3 className="text-sm">Tổng đơn hàng tháng này</h3>
        <p className="text-2xl font-bold py-3">
          {dashboardStore.dashboardData.totalOrderThisMonth}
          <span className="text-base font-semibold"> đơn</span>
        </p>
      </div>
    </>
  );
};

export default Overview;
