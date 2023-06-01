import axios from "axios";
import { API_URL } from "./http";

export const getModerator = async () =>{
    try {
        const response=await axios.get(`${API_URL}/products?`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getCategories = async () =>{
    try {
        const response=await axios.get(`${API_URL}/products/category`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getProducts = async () =>{
    try {
        const response=await axios.get(`${API_URL}/products`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getOneProduct = async (id) =>{
    try {
        const response=await axios.get(`${API_URL}/products/${id}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const addReview = async (productId,data) =>{
    try {
        const response=await axios.post(`${API_URL}/products/${productId}/review`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const addComment = async (productId,reviewId,data) =>{
    try {
        const response=await axios.post(`${API_URL}/products/${productId}/review/${reviewId}/reply`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const addQuestion = async (productId,data) =>{
    try {
        const response=await axios.post(`${API_URL}/products/${productId}/question`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const addAnswer = async (productId,questionId,data) =>{
    try {
        const response=await axios.post(`${API_URL}/products/${productId}/question/${questionId}/answer`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getProductsByModerator = async () =>{
    try {
        const response=await axios.get(`${API_URL}/products/all-products-moderator`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getOneProductByModerator = async (productId) =>{
    try {
        const response=await axios.get(`${API_URL}/products/${productId}/moderator`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const approveOrRejectReviewByModerator = async (productId,reviewId,status) =>{
    try {
        const response=await axios.patch(`${API_URL}/products/${productId}/review/${reviewId}?approvalStatus=${status}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        // return await Promise.reject(error);
    }
}

export const approveOrRejectQuestionByModerator = async (productId,questionId,status,data) =>{
    try {
        if(data?.answer==null){
            const response=await axios.patch(`${API_URL}/products/${productId}/question/${questionId}?approvalStatus=${status}`);
            return await Promise.resolve(response.data);
        }else{
            return await axios.patch(`${API_URL}/products/${productId}/question/${questionId}?approvalStatus=${status}`,data);
        }
    } catch (error) {
        return await Promise.reject(error);
    }
}