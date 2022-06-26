import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import '@/styles/index.less'
import '@/components/vant/index.js'
import 'vant/lib/index.less'

import dayjs from 'dayjs'
// 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入中文包
import 'dayjs/locale/zh-cn'
// 使用插件
dayjs.extend(relativeTime)
// 挂载到全局
Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
