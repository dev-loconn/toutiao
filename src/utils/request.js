import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { toast } from 'vant'
import { refreshTokenRequest } from '@/api/user'

const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 统一添加请求头 Token
  const token = store.getters.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(
  // 响应成功
  function (response) {
    console.log('response', response);
    const refreshToken = store.getters.refreshToken
    console.log('refreshToken', refreshToken);
    return response
  },
  // 响应失败
  async function (error) {
    const { response, config } = error
    if (response?.status === 401) {
      try {
        // 获取本地 Token
        const refreshToken = store.getters.refreshToken
        if (!refreshToken) {
          toast('登录后才能操作')            
          router.push('/login')
          return
        }
        // 请求刷新 Token,需要使用新的 axios 请求,不能直接用 instance 实例
        const res = await axios({
          method: 'PUT',
          url: 'http://toutiao.itheima.net/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        })
        // 保存数据到 Vuex
        store.dispatch('loginInfo/updateTokenInfoAction', {
          token: res.data.data.token,
          refresh_token: refreshToken
        })
        // 使用 instance 重新发起请求
        return instance.request(config)
      } catch (error) {
        // 刷新失败,清空 Vuex, 重新登录
        // store.dispatch('loginInfo/updateTokenInfoAction', null)
        router.push('/login')
        toast('认证过期,请重新登录')
      }
    } else {
      return Promise.reject(error)
    }
  }
)

export default instance
