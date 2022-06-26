import request from '@/utils/request'

// 根据频道获取新闻列表
export const getArticles = (params) => request.get('v1_0/articles', { params })
