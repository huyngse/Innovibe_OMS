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

export const login = async (email: string, password: string) => {
    try {
        const result = await axiosClient.post(`/api/auth/login`, {
            email: email,
            password: password
        });
        return { error: null, data: result.data.data, success: true };
    } catch (error: any) {
        return handleApiError(error);
    }
}

type RegisterRequest = {
    fullName: string,
    email: string,
    password: string,
    address: string,
    birthDate: Date,
}

export const register = async (request: RegisterRequest) => {
    try {
        const result = await axiosClient.post(`/api/auth/register`, request);
        return { error: null, data: result.data.data, success: true };
    } catch (error: any) {
        return handleApiError(error);
    }
}

export const getUserInfo = async () => {
    try {
        const result = await axiosClient.get(`/api/accounts/get-user-info`);
        return { error: null, data: result.data, success: true };
    } catch (error: any) {
        return handleApiError(error);
    }
}