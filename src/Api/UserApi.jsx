import axiosInstance from "../Configuration/axiosInstance"
const token = localStorage.getItem('token')
import { toast } from 'react-toastify';

console.log("Token is : ", token);


export const signup = async(data) => {
    try {
        const response = await axiosInstance.post('/api/auth/signup', data)
        console.log("response from UserApi: ",response)
        return response
    } catch (error) {
        console.log("error form UserApi: ", error);
        toast.error(error.response.data.message)
        
    }
}

export const login = async(data) => {
    try {
        const response = await axiosInstance.post('/api/auth/login', data)
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
}