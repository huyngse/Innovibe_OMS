import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useDashboardStore from "@/stores/use-dashboard-store";
import { Pie, PieChart } from "recharts";

const OrderStatusChart = () => {
  const chartConfig = {
    percentage: {
      label: "%",
    },
    Pending: {
      label: "Đợi thanh toán",
      color: "hsl(var(--chart-6))",
    },
    Processing: {
      label: "Chuẩn bị hàng",
      color: "hsl(var(--chart-1))",
    },
    Shipped: {
      label: "Đang giao hàng",
      color: "hsl(var(--chart-2))",
    },
    Delivered: {
      label: "Đã nhận hàng",
      color: "hsl(var(--chart-3))",
    },
    Cancelled: {
      label: "Đã hủy",
      color: "hsl(var(--chart-4))",
    },
    Returned: {
      label: "Trả hàng",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const dashboardStore = useDashboardStore();

  if (!dashboardStore.dashboardData) {
    return;
  }
  const chartData = dashboardStore.dashboardData.orderStatusPercentage.map(
    (data) => ({
      status: data.status,
      percentage: data.percentage,
      fill: `var(--color-${data.status})`,
    })
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê trạng thái đơn hàng</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="status" hideLabel />}
            />
            <Pie data={chartData} dataKey="percentage" nameKey="status" />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default OrderStatusChart;
