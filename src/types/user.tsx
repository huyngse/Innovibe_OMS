export type User = {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  role: "Customer" | "Admin" | "Staff";
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
};
