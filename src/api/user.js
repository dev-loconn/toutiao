import request from '@/utils/request'

// 登录接口
export const login = data => request.post('/v1_0/authorizations', data)
// 获取验证码
export const sendCode = mobile => request.get(`/v1_0/sms/codes/${mobile}`)
// 获取用户自己的个人信息
export const getUser = () => request.get('/v1_0/user')
