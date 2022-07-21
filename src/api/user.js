import request from '@/utils/request'

// 登录接口
export const login = data => request.post('/v1_0/authorizations', data)

// 刷新 Token
export const refreshTokenRequest = () => request.put('/v1_0/authorizations')

// 获取验证码
export const sendCode = mobile => request.get(`/v1_0/sms/codes/${mobile}`)

// 获取用户自己的个人信息
export const getUser = () => request.get('/v1_0/user')

// 关注用户
export const followUser = (data) => request.post('/v1_0/user/followings', data)

// 取消关注
export const cancelFollowUser = (id) => request.delete(`/v1_0/user/followings/${id}`)

// 获取个人资料
export const getUserProfile = () => request.get('/v1_0/user/profile')

// 修改个人资料
export const setUserProfile = (data) => request.patch('/v1_0/user/profile',data)

// 上传头像
export const uploadAvatar = (data) => request.patch('/v1_0/user/photo', data)
