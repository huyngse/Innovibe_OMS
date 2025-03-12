import { getAllOrders, getOrderById, getOrderByUserId } from '@/lib/api/order-api';
import { Order } from '@/types/order';
import { create } from 'zustand';


interface OrderState {
    orders: Order[];
    order?: Order;
    loading: boolean;
    error: string | null;
    fetchOrdersByUserId: (userId: string) => Promise<void>;
    fetchOrder: (id: number) => Promise<void>;
    fetchOrders: () => Promise<void>;
    renderKey: number;
    rerender: () => void;
}

const useOrderStore = create<OrderState>((set) => ({
    orders: [],
    loading: false,
    order: undefined,
    error: null,
    renderKey: 0,
    rerender: () => {
        set(prev => ({ renderKey: prev.renderKey + 1 }))
    },
    fetchOrdersByUserId: async (userId: string) => {
        set({ loading: true, error: null });
        try {
            const response = await getOrderByUserId(userId);
            if (!response.error) {
                set({ orders: response.data, loading: false });
            } else {
                set({ loading: false, error: response.error });
            }
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    }, 
    fetchOrders: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getAllOrders();
            if (!response.error) {
                set({ orders: response.data, loading: false });
            } else {
                set({ loading: false, error: response.error });
            }
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
    fetchOrder: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = await getOrderById(id);
            if (!response.error) {
                set({ order: response.data, loading: false });
            } else {
                set({ loading: false, error: response.error });
            }
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
}));

export default useOrderStore;