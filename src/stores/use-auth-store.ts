import { getUserInfo } from '@/lib/api/auth-api';
import { Account } from '@/types/account';
import { create } from 'zustand';


interface AuthState {
    user?: Account;
    loading: boolean;
    error: string | null;
    fetchUserInfo: () => Promise<void>;
    logout: () => void;
    renderKey: number;
    rerender: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: undefined,
    loading: false,
    error: null,
    renderKey: 0,
    rerender: () => {
        set(prev => ({ renderKey: prev.renderKey + 1 }))
    },
    fetchUserInfo: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getUserInfo();
            if (!response.error) {
                set({ user: response.data, loading: false });
            } else {
                set({ loading: false, error: response.error });
            }
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
    logout: () => {
        localStorage.clear();
        set({ user: undefined });
    }
}));

export default useAuthStore;