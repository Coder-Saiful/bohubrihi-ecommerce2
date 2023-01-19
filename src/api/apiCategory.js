import axios from "axios";
import { API } from "../utils/config";

export const createCategory = (token, data) => {
    return axios.post(`${API}/category`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getCategories = () => {
    return axios.get(`${API}/category`);
}

export const getSingleCategory = (id) => {
    return axios.get(`${API}/category/${id}`);
}

export const updateCategory = (token, data, id) => {
    return axios.put(`${API}/category/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const deleteCategory = (token, id) => {
    return axios.delete(`${API}/category/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}