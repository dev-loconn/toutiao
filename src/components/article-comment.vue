<template>
  <div class="comment-wrapper">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="list.length ? '没有更多了' : '暂无评论'"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      :immediate-check="false"
    >
      <comment-item
        v-for="item in list"
        :key="item.com_id"
        :comment="item"
        @onReply="$emit('onReply', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from '@/components/comment-item.vue'

export default {
  name: 'ArticleComment',
  components: { CommentItem },
  props: {
    source: {
      type: [Number, String],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      offset: null,
      loading: false,
      finished: false,
      error: false
    }
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: 20
        })
        const { results, last_id, total_count } = data.data
        this.list.push(...results)
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

<style scoped lang="less">
</style>