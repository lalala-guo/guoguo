// 下载并引入axios
import Axios from "axios";
import NProgress from "nprogress"; // 此时引入的是nprogress.js 文件  因为nprogress配置文件默认想歪暴露的是nprogress.js
import 'nprogress/nprogress.css';

// 配置不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({ showSpinner: false }) 

// 创建一个新的axios的实例 instance  是一个函数  和axios的功能相似  可以作为函数和对象发送请求
const instance = Axios.create({
    // 基础url配置
    baseURL: '/api',
    // 处理请求的超时时间
    timeout:5000,
})
// axios请求拦截器
instance.interceptors.request.use(
    // 配置对象
    config => {
        console.log('请求拦截器执行')
        //显示进度条 
        NProgress.start()
        return config
    }
)
// axios响应拦截器
instance.interceptors.response.use(
    response => {
        
        console.log('响应拦截器成功回调执行')
        // 隐藏进度条
        NProgress.done()
        // 返回成功的数据
        return response.data
    },
    error => {
        console.log('响应拦截器失败回调执行')
        // 隐藏进度条
        NProgress.done()
        // 也可对错误进行处理
        alert(`请求失败:${error.message||'未知错误'}`)
        // 返回失败的promise    不能直接返回error  因为直接返回error的话返回的是一个成功的promise
        return Promise.reject(error)   //  也可以throw error  跑出错误
    }
)
export default instance
