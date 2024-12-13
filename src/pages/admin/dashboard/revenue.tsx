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
const chartConfig = {
  revenue: {
    label: "Doanh thu",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Mục tiêu",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
const chartData = [
  { month: "January", revenue: 1000000, target: 1000000 },
  { month: "February", revenue: 1200000, target: 1100000 },
  { month: "March", revenue: 900000, target: 950000 },
  { month: "April", revenue: 1300000, target: 1250000 },
  { month: "May", revenue: 1500000, target: 1400000 },
  { month: "June", revenue: 1700000, target: 1600000 },
  { month: "July", revenue: 1600000, target: 1550000 },
  { month: "August", revenue: 1800000, target: 1750000 },
  { month: "September", revenue: 2000000, target: 1900000 },
  { month: "October", revenue: 2100000, target: 2000000 },
  { month: "November", revenue: 2200000, target: 2150000 },
  { month: "December", revenue: 2500000, target: 2400000 },
];
const Revenue = () => {
  return (
    <Card className="col-span-8">
      <CardHeader>
        <CardTitle className="text-lg">Thống kê doanh thu</CardTitle>
        <CardDescription className="flex gap-5">
          <div className="flex gap-2 items-center">
            <div className="size-3 bg-[hsl(var(--chart-1))] rounded-sm"></div>{" "}
            Doanh thu
          </div>
          <div className="flex gap-2 items-center">
            <div className="size-3 bg-[hsl(var(--chart-2))] rounded-sm"></div>{" "}
            Mục tiêu
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
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}
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
              Hiển thị tổng số lượt truy cập trong 12 tháng qua.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Revenue;
