import { setItem, getItem } from '@/utils/localStore'

const TOKEN_INFO = 'TOKEN_INFO'

export default {
  namespaced: true,
  state: {
    tokenInfo: getItem(TOKEN_INFO)
  },
  getters: {
  },
  mutations: {
    updateTokenInfo (state, payload) {
      state.tokenInfo = payload
    }
  },
  actions: {
    updateTokenInfoAction (context, tokenInfo) {
      context.commit('updateTokenInfo', tokenInfo)
      // 保存Token到本地
      setItem(TOKEN_INFO, tokenInfo)
    }
  }
}
