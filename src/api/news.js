import request from '@/utils/request'

// 根据频道获取新闻列表
export const getArticles = (params) => request.get('v1_0/articles', { params })

// 获取新闻详情
export const getArticleDetail = (id) => request.get(`/v1_0/articles/${id}`)

// 文章点赞
export const likeArticle = (id) => request.post('/v1_0/article/likings', { target: id})

// 取消点赞
export const cancelLikeArticle = (id) => request.delete(`/v1_0/article/likings/${id}`)

// 收藏
export const collectArticle = (id) => request.post('/v1_0/article/collections', { target: id})

// 取消收藏
export const cancelCollectArticle = (id) => request.delete(`/v1_0/article/collections/${id}`)
