import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.response?.data.message || error?.message || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export const getOrderById = async (id: Number) => {
  try {
    const { data } = await axiosClient.get(`/api/orders/${id}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateOrderStatus = async (id: number, status: string) => {
  try {
    const { data } = await axiosClient.put(`/api/orders/${id}/status?status=${status}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getOrderByUserId = async (id: string) => {
  try {
    const { data } = await axiosClient.get(`/api/orders/account/${id}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAllOrders = async () => {
  try {
    const { data } = await axiosClient.get(`/api/orders`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

type CreateOrderRequest = {
  accountId: string;
  orderStatus: string;
  total: number;
  shippingAddress: string;
  couponId?: number;
  orderItems: {
    productId: number;
    quantity: number;
  }[];
};

export const createOrder = async (request: CreateOrderRequest) => {
  try {
    const { data } = await axiosClient.post(`/api/orders`, request);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPayment = async (orderId: number) => {
  try {
      const { data } = await axiosClient.get(`/api/payments/payos/info/${orderId}`);
      return { error: null, data: data, success: true };
  } catch (error) {
      return handleApiError(error);
  }
}