import axiosInstance from './axiosInstance';
import { ApiResponse } from '../types';

// Get all products
export const getAllProducts = async (): Promise<ApiResponse<any[]>> => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

// Get product by ID
export const getProductById = async (id: string): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

// Add a product
export const addProduct = async (productData: FormData): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.post('/api/products', productData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Delete a product by ID
export const deleteProduct = async (id: string): Promise<ApiResponse<{ message: string }>> => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};
