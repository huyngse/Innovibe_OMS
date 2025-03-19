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

type AddProductRequest = {
    name: string,
    description: string,
    price: number,
    quantity: number,
    status: string,
    brandId: number,
    categoryId: number,
    image: {
        imageURL: string,
        position: number,
    }[]
}

export const addProduct = async (request: AddProductRequest) => {
    try {
        const { data } = await axiosClient.post(`/api/products`, request);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}

export const deleteProduct = async (productId: number) => {
    try {
        const { data } = await axiosClient.delete(`/api/products/${productId}`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateProductStatus = async (id: number, status: string) => {
    try {
        const { data } = await axiosClient.put(`/api/products/${id}/status?status=${status}`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}