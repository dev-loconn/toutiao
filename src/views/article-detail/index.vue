<template>
  <div class="detail-wrapper">
    <van-nav-bar
      :title="detailInfo.title"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-html="detailInfo.content"></div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/news'

export default {
  name: 'ArticleDetail',
  data() {
    return {
      detailInfo: {}
    }
  },
  created() {
    this.requestDetailInfo()
  },
  methods: {
    async requestDetailInfo() {
      const { data } = await getArticleDetail(this.$route.params.id)
      this.detailInfo = data.data
      console.log(data)
    },
    onClickLeft(){
      this.$router.back()
    }
  }
}
</script>

<style>
</style>