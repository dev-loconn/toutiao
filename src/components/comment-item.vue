<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="comment.aut_photo"
    />
    <span style="color: #466b9d" slot="title">{{ comment.aut_name }}</span>
    <div slot="label">
      <p style="color: #363636">{{ comment.content }}</p>
      <div class="label-bot">
        <span style="margin-right: 10px">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button
          class="replay-btn"
          size="mini"
          type="default"
          @click="$emit('onReply', comment)"
        >
          <van-icon slot="icon" name="chat-o" size="14" />
          {{ comment.reply_count }}
        </van-button>
      </div>
    </div>
    <template #right-icon>
      <div
        class="like-right"
        @click="onLikeComment(comment.is_liking, comment.com_id)"
      >
        <van-icon
          :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          :class="{ active: comment.is_liking }"
          size="16"
        />
        <span name="good-job-o">{{ comment.like_count || '' }}</span>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { likeComment, cancelLikeComment } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLikeComment(isLike, id) {
      try {
        const status = !isLike
        if (status) {
          // 点赞
          await likeComment(id)
          this.comment.like_count++
        } else {
          // 取消
          await cancelLikeComment(id)
          this.comment.like_count--
        }
        this.comment.is_liking = status
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
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .like-right {
    align-self: flex-start;
    display: flex;
    align-items: center;
    i {
      margin-right: 2px;
    }
  }
  :deep(.van-cell__label) {
    .label-bot {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        height: 24px;
        line-height: 24px;
      }
    }
  }
  :deep(.replay-btn) {
    border: none;
  }
  .active {
    color: #3296fa;
  }
}
</style>