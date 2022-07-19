import Vue from 'vue'
import dayjs from 'dayjs'

// 导入中文包
import 'dayjs/locale/zh-cn'
// 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 相对时间全局过滤器
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
