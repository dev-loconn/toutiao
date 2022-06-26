<template>
  <div class="article-item">
    <div class="left-wrap">
      <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
      <div class="img-list" v-if="article.cover.type === 3">
        <van-image class="img-item" fit="cover" :src="imgSrc" v-for="(imgSrc, index) in article.cover.images" :key="index" />
      </div>
      <div class="info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate }}</span>
      </div>
    </div>
    <div class="right-wrap" v-if="article.cover.type === 1">
      <van-image class="img-right" fit="cover" :src="article.cover.images[0]" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  box-sizing: border-box;
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #f7f7f7;

  .left-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .title {
      font-size: 16px;
      color: #3a3a3a;
      margin-bottom: 12px;
    }
    .img-list {
      display: flex;
      margin-bottom: 12px;
      .img-item {
        flex: 1;
        height: 73px;
        &:not(:last-child){
          margin-right: 5px;
        }
      }
    }
    .info-wrap {
      display: inline-block;
      font-size: 10px;
      color: #b4b4b4;
      span {
        margin-right: 10px;
      }
    }
  }

  .right-wrap {
    margin-left: 5px;
    .img-right {
      width: 116px;
      height: 73px;
    }
  }
}
</style>
