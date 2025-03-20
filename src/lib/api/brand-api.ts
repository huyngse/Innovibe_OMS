import { toast } from 'sonner';
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

export const getAllBrands = async () => {
    try {
        const { data } = await axiosClient.get(`/api/brands`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}
export const createBrand = async (formData: { name: string; description: string }) => {
    try {
        const payload = {
            name: formData.name,
            description: formData.description,
        };
        const { data } = await axiosClient.post(`/api/brands`, payload);
        toast.success("Thêm mới thương hiệu thành công"); 
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
};