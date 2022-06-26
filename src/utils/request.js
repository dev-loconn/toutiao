import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 统一添加请求头 Token
  const { loginInfo } = store.state
  if (loginInfo?.tokenInfo) {
    config.headers.Authorization = `Bearer ${loginInfo.tokenInfo.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default instance
