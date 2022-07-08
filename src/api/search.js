import request from '@/utils/request'

// 联想建议
export const getSuggestion = q => request.get('/v1_0/suggestion', { params: { q } })

// 搜索结果
export const getSearchResult = (params) => request.get('/v1_0/search', { params })
