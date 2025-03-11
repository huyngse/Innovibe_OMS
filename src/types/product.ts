export type Product = {
  productId: number,
  name: string,
  status: | "In Stock"
  | "Out of Stock"
  | "Pending"
  | "In Transit"
  | "Discontinued",
  price: number,
  quantity: number,
  images: ProductImage[],
  description: string,
  discount?: number,
  createAt: string,
  brand: {
    brandId: number,
    name: string,
    description: string,
  },
  category: {
    categoryId: number,
    name: string,
    description: string,
  },
}

export type ProductImage = {
  imageId: number,
  productId: number,
  imageURL: string,
  position: number,
}