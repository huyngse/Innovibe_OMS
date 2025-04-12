import { Product } from "./product"

export type DashboardData = {
    totalRevenueThisMonth: number,
    totalRevenueAllTime: number,
    totalOrderThisMonth: number,
    totalOrderAllTime: number,
    revenueByMonth: {
       month: string,
       revenue: number,
    }[],
    bestSelling: {
        product: Product,
        numOfOrder: number,
    }[],
    orderStatusPercentage: {
        status: string,
        percentage: number,
    }[]
}