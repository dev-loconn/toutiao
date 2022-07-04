import request from '@/utils/request'

// 获取所有频道列表
export const requestChannels = () => request.get('v1_0/channels')

// 获取用户的频道列表
export const requestUserChannels = request.get('v1_0/user/channels')

// 重置用户频道列表
export const setUserChannels = (channels) => request.put('v1_0/user/channels', { channels })
