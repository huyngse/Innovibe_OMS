export type Payment = {
    id: string,
    orderCode: number,
    amount: number,
    amountPaid: number,
    amountRemaining: number,
    status: string,
    createdAt: string,
    transactions: any[],
}