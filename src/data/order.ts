import guitarImage1 from "@/assets/images/guitar_1.png";
import guitarImage2 from "@/assets/images/guitar_2.png";
import { Order } from "@/types/order";
export const guitarOrders: Order[] = [
    {
        id: 1,
        orderId: "ORD-20240115-0001",
        customerName: "Alice Johnson",
        email: "alicejohnson@gmail.com",
        shippingAddress: "23015 Outer Dr, Allen Park, Michigan, 48101",
        shippingFee: 10_000,
        phone: "05417914919",
        orderDate: "2024-01-15",
        paymentDate: "2024-01-15",
        shippingDate: "2024-01-16",
        paymentMethod: "Cash",
        items: [
            {
                id: 1,
                productName:
                    "Ibanez Prestige AZ2204N Electric Guitar Prussian Blue Metallic",
                status: "Available",
                price: 10_000_000,
                image: guitarImage1,
                quantity: 1,
                category: "Electric guitar"
            },
            {
                id: 1,
                productName:
                    "Ibanez Prestige AZ2204N Electric Guitar Prussian Blue Metallic",
                status: "Available",
                price: 10_000_000,
                image: guitarImage1,
                quantity: 1,
                category: "Electric guitar"
            }
        ],
        status: "Shipped"
    },
    {
        id: 2,
        orderId: "ORD-20240120-0002",
        customerName: "Bob Smith",
        email: "bobsmith@gmail.com",
        phone: "05417914919",
        shippingAddress: "23015 Outer Dr, Allen Park, Michigan, 48101",
        shippingFee: 10_000,
        orderDate: "2024-01-20",
        paymentDate: "2024-01-20",
        shippingDate: "2024-01-21",
        deliveryDate: "2024-01-22",
        paymentMethod: "Cash",
        items: [
            {
                id: 2,
                productName:
                    "Ibanez Prestige AZ2204N Electric Guitar Prussian Blue Metallic",
                status: "Available",
                price: 10_000_000,
                image: guitarImage2,
                quantity: 2,
                category: "Electric guitar"

            }
        ],
        status: "Delivered"
    },
    {
        id: 3,
        orderId: "ORD-20240120-0003",
        customerName: "Bob Smith",
        email: "bobsmith@gmail.com",
        phone: "05417914919",
        shippingAddress: "23015 Outer Dr, Allen Park, Michigan, 48101",
        shippingFee: 10_000,
        orderDate: "2024-01-20",
        paymentDate: "2024-01-20",
        shippingDate: "2024-01-21",
        deliveryDate: "2024-01-22",
        paymentMethod: "Cash",
        items: [
            {
                id: 3,
                productName:
                    "Ibanez Prestige AZ2204N Electric Guitar Prussian Blue Metallic",
                status: "Available",
                price: 11_100_000,
                image: guitarImage2,
                quantity: 1,
                category: "Electric guitar"

            }
        ],
        status: "Cancelled"
    },
    {
        id: 4,
        orderId: "ORD-20240120-0004",
        customerName: "Bob Smith",
        email: "bobsmith@gmail.com",
        phone: "05417914919",
        shippingAddress: "23015 Outer Dr, Allen Park, Michigan, 48101",
        shippingFee: 10_000,
        orderDate: "2024-01-20",
        paymentDate: "2024-01-20",
        shippingDate: "2024-01-21",
        deliveryDate: "2024-01-22",
        paymentMethod: "Cash",
        items: [
            {
                id: 3,
                productName:
                    "Ibanez Prestige AZ2204N Electric Guitar Prussian Blue Metallic",
                status: "Available",
                price: 11_100_000,
                image: guitarImage2,
                quantity: 1,
                category: "Electric guitar"

            }
        ],
        status: "Pending"
    },
    {
        id: 5,
        orderId: "ORD-20240120-0005",
        customerName: "Bob Smith",
        email: "bobsmith@gmail.com",
        phone: "05417914919",
        shippingAddress: "23015 Outer Dr, Allen Park, Michigan, 48101",
        shippingFee: 10_000,
        orderDate: "2024-01-20",
        paymentDate: "2024-01-20",
        shippingDate: "2024-01-21",
        deliveryDate: "2024-01-22",
        paymentMethod: "Cash",
        items: [
            {
                id: 3,
                productName:
                    "Ibanez Prestige AZ2204N Electric Guitar Prussian Blue Metallic",
                status: "Available",
                price: 11_100_000,
                image: guitarImage2,
                quantity: 1,
                category: "Electric guitar"

            }
        ],
        status: "Processing"
    },
    {
        id: 6,
        orderId: "ORD-20240120-0006",
        customerName: "Bob Smith",
        email: "bobsmith@gmail.com",
        phone: "05417914919",
        shippingAddress: "23015 Outer Dr, Allen Park, Michigan, 48101",
        shippingFee: 10_000,
        orderDate: "2024-01-20",
        paymentDate: "2024-01-20",
        shippingDate: "2024-01-21",
        deliveryDate: "2024-01-22",
        paymentMethod: "Cash",
        items: [
            {
                id: 3,
                productName:
                    "Ibanez Prestige AZ2204N Electric Guitar Prussian Blue Metallic",
                status: "Available",
                price: 11_100_000,
                image: guitarImage2,
                quantity: 1,
                category: "Electric guitar"

            }
        ],
        status: "Returned"
    },
];