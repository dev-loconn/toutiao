<template>
  <div class="reply-wrapper">
    <van-nav-bar
      :title="comment.reply_count ? `${comment.reply_count}条回复` : '暂无回复'"
    >
      <van-icon
        slot="left"
        name="cross"
        color="#3296fa"
        size="18"
        @click="$emit('update:isReplyShow', false)"
      />
    </van-nav-bar>
    <div class="reply-main">
      <comment-item :comment="comment" />
      <van-cell title="全部回复" />
      <!-- 评论回复列表 -->
      <article-comment :source="comment.com_id" :list="commentList" type="c" @onReply="onReply"/>
    </div>
    <div class="reply-bot" @click="onWriteReply">
      <span>写回复</span>
    </div>

    <!-- 评论弹出层 -->
    <van-popup v-model="isPostShow" position="bottom">
      <article-post-comment
        :target="comId"
        :articleId="articleId"
        @postCommentSuccess="postCommentSuccess"
      />
    </van-popup>
  </div>
</template>

<script>
import ArticleComment from '@/components/article-comment.vue'
import CommentItem from '@/components/comment-item.vue'
import ArticlePostComment from '@/components/article-post-comment.vue'

export default {
  name: 'CommentReply',
  components: {
    ArticleComment,
    CommentItem,
    ArticlePostComment
  },
  inject: ['articleId'],
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentList: [],
      isPostShow: false,
      comId: this.comment.com_id
    }
  },
  methods: {
    onWriteReply() {
      this.isPostShow = true
      this.comId = this.comment.com_id
    },
    // 回复评论成功回调
    postCommentSuccess(data) {
      // 隐藏评论界面
      this.isPostShow = false
      // 将最新评论放到数组头部显示
      this.commentList.unshift(data.new_obj)
      // 更新总回复数
      this.comment.reply_count++
    },
    // 点击评论项的回复按钮
    onReply(comment) {
      this.isPostShow = true
      this.comId = comment.com_id
    }
  }
}
</script>

<style scoped lang="less">
.reply-wrapper {
  :deep(.van-nav-bar) {
    background-color: #fff;
    .van-nav-bar__content {
      .van-nav-bar__title {
        color: #000;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
  .reply-main {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 45px;
    overflow-y: auto;
  }
  .reply-bot {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    background-color: #fff;
    font-size: 14px;
    border-top: 1px solid #f5f5f5;
  }
}
</style>