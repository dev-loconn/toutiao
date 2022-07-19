import request from '@/utils/request'

// 获取评论列表
export const getComments = (params) => request.get('/v1_0/comments', { params })

// 对文章或者评论进行评论
export const postComment = (target, content, art_id) => request.post('/v1_0/comments', { target, content, art_id })

// 点赞评论
export const likeComment = (target) => request.post('/v1_0/comment/likings', { target })

// 取消点赞评论
export const cancelLikeComment = (target) => request.delete(`/v1_0/comment/likings/${target}`)