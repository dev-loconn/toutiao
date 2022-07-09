<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.back()" class="page-nav-bar" left-arrow :title="article.title"></van-nav-bar>

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name}}</div>
          <div slot="label" class="publish-date">{{ article.pubdate}}</div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-if="article.is_followed"
            >关注</van-button
          >
          <van-button
            class="follow-btn"
            round
            size="small"
            v-else
          >已关注</van-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="statusCode === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="article.comm_count" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/news'

export default {
  name: 'ArticleDetail',
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      article: {},
      isLoading: true,
      statusCode: 200
    }
  },
  created() {
    this.requestDetailInfo()
  },
  methods: {
    async requestDetailInfo() {
      try {
        this.isLoading = true
        const { data } = await getArticleDetail(this.id)
        this.article = data.data
      } catch ({ response }) {
        this.statusCode = response?.status || 500
      }
      this.isLoading = false
    },
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 14px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 12px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 16px;
      :deep(p) {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 60px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 16px 0 24px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 140px;
      height: 24px;
      border: 2px solid #eeeeee;
      font-size: 14px;
      line-height: 24px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 8px;
        background-color: #e22829;
      }
    }
  }
}
</style>