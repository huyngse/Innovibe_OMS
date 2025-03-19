import { axiosClientMultipart } from './config/axios-client-multi-form';

export const handleApiError = (error: any) => {
    try {
        const errorMessage = error.response?.data.message || error?.message || 'An unexpected error occurred.';
        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error('An unexpected error occurred.');
    }
};

export const uploadImage = async (imageFile: File) => {
    try {
        const formData = new FormData();
        formData.append('file', imageFile);
        const { data } = await axiosClientMultipart.post(`/api/images/upload-image`, formData);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}