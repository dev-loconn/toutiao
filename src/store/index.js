import Vue from 'vue'
import Vuex from 'vuex'
import loginInfo from './modules/loginInfo'
import state from '@/store/state'
import getters from '@/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations: {
  },
  actions: {
  }, 
  modules: {
    loginInfo
  }
})
