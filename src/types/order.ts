export type Order = {
    id: number,
    orderId: string,
    customerName: string,
    email: string,
    orderDate: string,
    paymentDate?: string,
    shippingDate?: string,
    deliveryDate?: string,
    shippingAddress: string,
    shippingFee: number,
    phone: string,
    paymentMethod: string,
    items: {
        id: number,
        productName: string,
        status: string,
        price: number,
        category: string,
        image: string,
        quantity: number,
    }[],
    status: "Placed" | "Paid" | "Shipped" | "Pending" | "Processing" | "Delivered" | "Cancelled" | "Returned"
}