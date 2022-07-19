<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPostComment" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/comment'

export default {
  name: 'ArticlePostComment',
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    articleId: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async onPostComment() {
      try {
        this.$toast.loading({
          duration: 0, 
          message: '发布中...',
          forbidClick: true
        })
        const { data } = await postComment(this.target, this.message, this.articleId)
        this.$emit('postCommentSuccess', data.data)
        this.message = ''
        this.$toast.success('发布成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 16px 0 16px 16px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>