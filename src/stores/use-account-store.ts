import { getAllAccounts } from '@/lib/api/account-api';
import { Account } from '@/types/account';
import { create } from 'zustand';


interface AccountState {
    accounts: Account[];
    loading: boolean;
    error: string | null;
    fetchAccounts: () => Promise<void>;
    renderKey: number;
    rerender: () => void;
}

const useAccountStore = create<AccountState>((set) => ({
    accounts: [],
    loading: false,
    error: null,
    renderKey: 0,
    rerender: () => {
        set(prev => ({ renderKey: prev.renderKey + 1 }))
    },
    fetchAccounts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getAllAccounts();
            if (!response.error) {
                set({ accounts: response.data, loading: false });
            } else {
                set({ loading: false, error: response.error });
            }
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
}));

export default useAccountStore;