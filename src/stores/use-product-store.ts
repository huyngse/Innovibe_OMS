
import { getAllProduct, getProductById } from '@/lib/api/product-api';
import { Product, ProductImage } from '@/types/product';
import { create } from 'zustand';


interface ProductState {
    products: Product[];
    filteredProducts: Product[];
    product?: Product;
    images: ProductImage[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    fetchProduct: (id: number) => Promise<void>;
    renderKey: number;
    rerender: () => void;
    setImages: (images: ProductImage[]) => void;
    addImage: (image: ProductImage) => void;
    removeImage: (image: ProductImage) => void;
    searchProduct: (keyword: string) => void;
}

const useProductStore = create<ProductState>((set) => ({
    products: [],
    filteredProducts: [],
    images: [],
    loading: false,
    product: undefined,
    error: null,
    renderKey: 0,
    rerender: () => {
        set(prev => ({ renderKey: prev.renderKey + 1 }))
    },
    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getAllProduct();
            if (!response.error) {
                set({ products: response.data, filteredProducts: response.data, loading: false });
            } else {
                set({ loading: false, error: response.error });
            }
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
    fetchProduct: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = await getProductById(id);
            if (!response.error) {
                set({ product: response.data, loading: false });
            } else {
                set({ loading: false, error: response.error });
            }
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
    setImages: (images) => {
        set({ images: images });
    },
    addImage: (image) => {
        set(prev => ({ images: [...prev.images, image] }))
    },
    removeImage: (image) => {
        set(prev => ({ images: prev.images.filter(i => i.imageURL != image.imageURL) }));
    },
    searchProduct(keyword) {
        set(prev => ({ filteredProducts: prev.products.filter(p => p.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())) }))
    },
}));

export default useProductStore;