import { getAllBrands } from '@/lib/api/brand-api';
import { Brand } from '@/types/brand';
import { create } from 'zustand';


interface BrandState {
    brands: Brand[];
    loading: boolean;
    error: string | null;
    fetchBrands: () => Promise<void>;
    renderKey: number;
    rerender: () => void;
}

const useBrandStore = create<BrandState>((set) => ({
    brands: [],
    loading: false,
    error: null,
    renderKey: 0,
    rerender: () => {
        set(prev => ({ renderKey: prev.renderKey + 1 }))
    },
    fetchBrands: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getAllBrands();
            if (!response.error) {
                set({ brands: response.data, loading: false });
            } else {
                set({ loading: false, error: response.error });
            }
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
}));

export default useBrandStore;