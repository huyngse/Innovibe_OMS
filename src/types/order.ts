import { Product } from "./product"

export type Order = {
    orderId: number,
    orderNumber: string,
    accountId: string,
    accountFullName: string,
    phone: string,
    email: string,
    orderDate: string,
    shippingAddress: string,
    total: number,
    paymentMethod: string,
    orderItems: Product[],
    orderStatus: "Shipped" | "Pending" | "Processing" | "Delivered" | "Cancelled" | "Returned"
}