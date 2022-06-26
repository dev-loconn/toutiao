<template>
  <div class="article-list">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" :success-text="successText" animation-duration="500">
      <van-list :error.sync="error" error-text="请求失败，点击重新加载" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <article-item v-for="item in list" :key="item.id" :article="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/news'
import ArticleItem from '@/components/article-item.vue'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false, // 控制列表加载失败的状态
      isRefresh: false,
      successText: '刷新成功'
    }
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      getArticles({ channel_id: this.channel.id, timestamp: Date.now() })
        .then(({ data: { data } }) => {
          const { pre_timestamp: timestamp, results } = data
          this.timestamp = timestamp
          this.list = results
          // 数据更新完成需要设置未加载状态
          this.isRefresh = false
          this.successText = `刷新成功，更新了${results.length}条数据`
          // 手动触发加载更多
          this.loading = true
          this.onLoad()
        })
        .catch(() => {
          this.isRefresh = false
          this.successText = '刷新失败，请重新尝试'
        })
    },
    // 加载更多
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          // 第一次请求为最新时间戳
          timestamp: this.timestamp || Date.now()
        })
        const { pre_timestamp: timestamp, results } = data?.data
        this.list.push(...results)

        // 数据更新完成需要设置未加载状态
        this.loading = false

        if (results) {
          // 更新服务器返回的时间戳获取更多数据
          this.timestamp = timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 给列表根节点设置：固定高度和垂直滚动
// 这样就就可以让列表在根节点div里面独自滚动，而不是整个body在滚动
// 这样就可以让每个列表都拥有自己的滚动进度，而且滚动条也不会撑满高度不好看
.article-list {
  height: 83vh;
  overflow-y: auto;
}
</style>
