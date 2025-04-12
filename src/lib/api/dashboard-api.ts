import { DashboardData } from '@/types/statistic';
import { axiosClient } from './config/axios-client';

export const handleApiError = (error: any) => {
    try {
        const errorMessage = error.response?.data.message || error?.message || 'An unexpected error occurred.';
        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error('An unexpected error occurred.');
    }
};



export const getDashboardData = async () => {
    try {
        const result = await axiosClient.get(`/api/admin/dashboard`);
        return { error: null, data: result.data as DashboardData, success: true };
    } catch (error: any) {
        return handleApiError(error);
    }
}