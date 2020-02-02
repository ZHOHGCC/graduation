import axios from "axios"
import {
    Loading,
    Message
} from "element-ui"
import router from './router';

axios.defaults.baseURL = 'http://www.hackerboy.cn:8084/api/'
// http://www.talentedpanda.cn:8080/blog/
//请求拦截
let loading

function startLoading () {
    loading = Loading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(0,0,0,0,7)'
    })
}

function endLoading () { //使用Element loading-close 方法
    loading.close()
}
//请求拦截
axios.interceptors.request.use((config) => {
    startLoading()
    if (localStorage.token) {
        //统一的请求头
        config.headers.token = localStorage.token
    }
    return config
},
    error => {
        return Promise.reject(error)
    })

//响应
axios.interceptors.response.use((response) => {
    endLoading()
    let status = response.data.status
    if (status == 401 || status == 403) {
        Message.error('token 失效,重新登录')
        //清除token
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/login')

    }
    // ------------处理错误
    if (status === -1) {
        Message.error(response.data.msg)
        return false

    }
    return response.data
},
    error => {
        endLoading()
        Message.error(error.response.data)
        let status = error.response.status

        if (status == 401 || status == 403) {
            Message.error('token 失效,重新登录')
            //清除token
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            router.push('/login')
        }

    })



export default axios