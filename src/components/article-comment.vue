<template>
  <div class="comment-wrapper">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.com_id" :title="item.content" />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'

export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      list: [],
      offset: null,
      loading: false,
      finished: false,
      error: false
    }
  },
  created() {
    
  },
  methods: {
    async onLoad() {
      try {
        const { data: { data } } = await getComments({
          type: 'a',
          source: this.articleId,
          offset: this.offset,
          limit: 20
        })
        const { results, last_id, total_count } = data
        this.list.push(...results)
        console.log(data);
        // 加载状态结束
        this.loading = false
        if (results.length) {
          this.offset = last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style>
</style>