export type Product = {
  id: number;
  productName: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryName: string;
  brandName: string;
  productImages: ProductImage[];
  status:
    | "In Stock"
    | "Out of Stock"
    | "Pending"
    | "In Transit"
    | "Discontinued";
  createdAt: string;
  updatedAt: string;
};

export type ProductImage = {
  id: number;
  productId: number;
  imageUrl: string;
  isPrimary: boolean;
  createdAt: string;
};
