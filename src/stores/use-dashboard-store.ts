import { getDashboardData } from '@/lib/api/dashboard-api';
import { DashboardData } from '@/types/statistic';
import { create } from 'zustand';


interface DashboardState {
    dashboardData: DashboardData | null;
    loading: boolean;
    error: string | null;
    fetchDashboardData: () => Promise<void>;
    renderKey: number;
    rerender: () => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
    dashboardData: null,
    loading: false,
    error: null,
    renderKey: 0,
    rerender: () => {
        set(prev => ({ renderKey: prev.renderKey + 1 }))
    },
    fetchDashboardData: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getDashboardData();
            if (!response.error) {
                set({ dashboardData: response.data, loading: false });
            } else {
                set({ loading: false, error: response.error });
            }
        } catch (error: any) {
            set({ loading: false, error: error.message });
        }
    },
}));

export default useDashboardStore;