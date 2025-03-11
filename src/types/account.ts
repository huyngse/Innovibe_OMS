export type Account = {
    accountId: string,
    fullName: string,
    address: string,
    birthDate: string,
    email: string,
    role: "User" | "Admin" | "Staff",
    createAt: string,
    updateAt: string
}