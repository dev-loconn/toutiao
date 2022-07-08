<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
  </van-list>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true,
      page: 1
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data: data } = await getSearchResult({
          page: this.page,
          per_page: 20,
          q: this.searchText
        })
        const { results, total_count } = data.data
        this.list.push(...results)

        // 结束正在加载状态
        this.loading = false
        // 根据总页数判断数据是否加载完
        if (this.page < total_count) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      }
    }
  }
}
</script>

<style>
</style>