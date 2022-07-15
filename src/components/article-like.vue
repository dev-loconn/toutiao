<template>
  <van-button
    class="btn"
    :class="{ active: value === 1 }"
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
    :loading="loading"
  />
</template>

<script>
import { likeArticle, cancelLikeArticle } from '@/api/news'
export default {
  name: 'ArticleLike',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onLike() {
      this.loading = true
      try {
        const status = this.value === 1 ? -1 : 1
        if (status === 1) {
          // 点赞
          await likeArticle(this.articleId)
        } else {
          // 取消
          await cancelLikeArticle(this.articleId)
        }
        this.$emit('input', status)
      } catch ({ response }) {
        switch (response?.status) {
          case 401:
            this.$toast('请先登录')
            break
          case 400:
            this.$toast(response.data.message)
            break
          default:
            this.$toast('网络错误,请重新尝试!')
            break
        }
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.btn {
  border: none;
  color: #777;
  font-size: 18px;
}
.active {
  .van-icon {
    color: #3296fa;
  }
}
</style>