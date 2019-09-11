import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000, // request timeout
    headers: {'Content-Type':'application/x-www-form-urlencoded'}
})
console.log('请求地址：'+process.env.BASE_API);
// request interceptor
service.interceptors.request.use(config => {
    return config
}, error => {
    console.log(error)
})

// respone interceptor
service.interceptors.response.use(response => response,
    error => {
        Message({
            message: '网络异常，请联系管理员',
            type: 'error',
            duration: 2000
        })
        return Promise.reject(error)
    })

export default service
