export default {
  tokenInfo(state) {
    return state.loginInfo.tokenInfo
  },
  token(state, getters) {
    return getters.tokenInfo?.token
  },
  refreshToken(state, getters){
    return getters.tokenInfo?.refresh_token
  }
}