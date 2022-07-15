<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      class="page-nav-bar"
      left-arrow
      :title="article.title"
    ></van-nav-bar>

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
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate }}</div>
          <!-- 关注 -->
          <follow-user
            :isFollow="article.is_followed"
            :userId="article.aut_id"
            @update-isfollow="article.is_followed = $event"
          ></follow-user>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="articleContent"
        ></div>

        <van-divider>正文结束</van-divider>

        <!-- 文章评论 -->
        <article-comment :articleId="article.art_id"></article-comment>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="article.comm_count" color="#777" />
          <article-collect
            v-model="article.is_collected"
            :articleId="article.art_id"
          />
          <article-like v-model="article.attitude" :articleId="article.art_id"/>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
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
  </div>
</template>

<script>
import { getArticleDetail, likeArticle } from '@/api/news'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user.vue'
import ArticleCollect from '@/components/article-collect.vue'
import ArticleLike from '@/components/article-like.vue'
import ArticleComment from '@/components/article-comment.vue'

export default {
  name: 'ArticleDetail',
  components: {
    FollowUser,
    ArticleCollect,
    ArticleLike,
    ArticleComment
  },
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
      statusCode: 200,
      isFollowLoading: false
    }
  },
  created() {
    this.requestDetailInfo()
  },
  methods: {
    // 请求文章详情数据
    async requestDetailInfo() {
      try {
        this.isLoading = true
        const { data } = await getArticleDetail(this.id)
        this.article = data.data
        this.handlerImagePreview()
      } catch ({ response }) {
        this.statusCode = response?.status || 500
      }
      this.isLoading = false
    },
    onClickLeft() {
      this.$router.back()
    },
    // 文章大图查看
    handlerImagePreview() {
      // 在 dom 更新完成后执行
      this.$nextTick(function () {
        const articleContent = this.$refs.articleContent
        if (articleContent) {
          // 拿到文章内容节点下的所有 img 元素
          const imgs = articleContent.querySelectorAll('img')
          const imgSrcs = []
          imgs.forEach((e, i) => {
            imgSrcs.push(e.src)
            e.addEventListener('click', () => {
              // 打开图片预览
              ImagePreview({
                images: imgSrcs,
                closeable: true,
                startPosition: i
              })
            })
          })
        }
      })
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
    background-color: #fff;
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
    }

    .article-content {
      padding: 16px;
      :deep(p) {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    height: 100%;
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
    justify-content: space-evenly;
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