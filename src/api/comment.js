import request from '@/utils/request'

// 获取评论列表
export const getComments = (params) => request.get('/v1_0/comments',{ params })