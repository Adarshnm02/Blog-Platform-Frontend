import axiosInstance from "../Configuration/axiosInstance"
import { toast } from 'react-toastify';
const token = localStorage.getItem('token')


export const signup = async(data) => {
    try {
        const response = await axiosInstance.post('/api/auth/signup', data)
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
        toast.error(error.response.data.message)
    }
}

export const BlogPost = async(data) => {
    try{
        const response = await axiosInstance.post('/api/posts/createPost', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        } )
        return response
    }catch(error){
        console.log("Error in BlogPost:", error)
        toast.error(error.response.data.message)
    }
}

export const getBlog = async() => {
    try{
        if(token){
            const response = await axiosInstance.get('/api/posts/getBlog', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return response
        }
    }catch(error){
        console.log("GetBlog error", error)
        toast.error(error.response.data.message)
    }
}

export const getPost = async(postId) => {
    try {
        if(token){
            const response = await axiosInstance.get(`/api/posts/getPost/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch post');
    }
}


export const getUserPosts = async() => {
    try {
        if(token){
            const response = await axiosInstance.get(`/api/posts/getUserPosts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        toast.error(error.response?.data?.message || 'Failed to fetch user posts');
        return [];
    }
}