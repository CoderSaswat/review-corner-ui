import axios from "axios"
import { API_URL } from "./http";


export const sendOtp = async (data) =>{
    try {
        const response=await axios.post(`${API_URL}/users/send-otp`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const varifyOtp = async (data) =>{
    try {
        const response=await axios.post(`${API_URL}/users/varify-otp`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const login = async (data) =>{
    try {
        const response=await axios.post(`${API_URL}/users/login`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const signUp = async (data) =>{
    try {
        const response=await axios.post(`${API_URL}/users/signup`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getUsersMe = async () =>{
    try {
        const response=await axios.get(`${API_URL}/users/me`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const addModerator = async (data) =>{
    try {
        const response=await axios.post(`${API_URL}/users/moderators/invite`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getModerator = async () =>{
    try {
        const response=await axios.get(`${API_URL}/users/moderators`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const updateModeratorStatus = async (id,status) =>{
    try {
        const response=await axios.patch(`${API_URL}/users/moderators/${id}?isActive=${status}`);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const changePassword = async (data) =>{
    try {
        const response=await axios.post(`${API_URL}/users/change-password`,data);
        return await Promise.resolve(response.data);
    } catch (error) {
        return await Promise.reject(error);
    }
}


