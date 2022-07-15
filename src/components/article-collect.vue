<template>
  <van-button
    class="btn"
    :class="{ active: value }"
    :icon="value ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { collectArticle, cancelCollectArticle } from '@/api/news'

export default {
  name: 'ArticleCollect',
  props: {
    value: {
      type: Boolean,
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
    async onCollect() {
      this.loading = true
      try {
        const status = !this.value
        if (status) {
          // 收藏
          await collectArticle(this.articleId)
        } else {
          // 取消
          await cancelCollectArticle(this.articleId)
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
    color: #ffa500;
  }
}
</style>