import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrencyVND } from "@/lib/currency";
import useDashboardStore from "@/stores/use-dashboard-store";
const chartConfig = {
  revenue: {
    label: "Doanh thu",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Revenue = () => {
  const dashboardStore = useDashboardStore();
  if (!dashboardStore.dashboardData) {
    return;
  }
  const chartData = dashboardStore.dashboardData.revenueByMonth;
  return (
    <div className="col-span-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thống kê doanh thu</CardTitle>
          <CardDescription className="flex gap-5">
            <div className="flex gap-2 items-center">
              <div className="size-3 bg-[hsl(var(--chart-1))] rounded-sm"></div>{" "}
              Doanh thu
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                          style={
                            {
                              "--color-bg": `var(--color-${name})`,
                            } as React.CSSProperties
                          }
                        />
                        <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig]
                            ?.label || name}
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {formatCurrencyVND(value as number)}
                          </div>
                        </div>
                      </>
                    )}
                  />
                }
              />
              <Line
                dataKey="revenue"
                type="monotone"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-revenue)",
                }}
              />
              <Line
                dataKey="target"
                type="monotone"
                stroke="var(--color-target)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-target)",
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="w-full items-start gap-2 text-sm">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Hiển thị doanh thu theo tháng trong 12 tháng qua.
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Revenue;
