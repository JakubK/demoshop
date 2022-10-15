import axios from 'axios';

const baseURL = 'http://localhost:3000/api'

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  (response: any) => response.data,
  (error: any) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
