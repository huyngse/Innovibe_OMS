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

export const getAllProduct = async () => {
    try {
        const { data } = await axiosClient.get(`/api/products`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getProductById = async (id: number) => {
    try {
        const { data } = await axiosClient.get(`/api/products/${id}`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}