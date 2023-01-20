import axios from "axios";
import { API } from "../utils/config";

export const createProduct = (token, data) => {
    return axios.post(`${API}/product`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getProducts = () => {
    return axios.get(`${API}/product`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getSingleProduct = (id) => {
    return axios.get(`${API}/product/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        } 
    });
}

export const updateProduct = (token, data, id) => {
    return axios.put(`${API}/product/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const deleteProduct = (token, id) => {
    return axios.delete(`${API}/product/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}