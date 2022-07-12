<template>
  <div class="home-container">
    <!-- 顶部 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button
          class="btn-search"
          type="info"
          size="small"
          icon="search"
          to="/search"
          round
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs
      class="tab-channels"
      animated
      swipeable
      color="#3296fa"
      line-width="16px"
      v-model="tabIndex"
      border
    >
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <!-- 让每个频道都拥有独自的文章列表 -->
        <article-list :channel="channel" />
      </van-tab>
      <template #nav-right>
        <div class="more-holder"></div>
        <div class="more" @click="showChannelPop">
          <i class="tt tt-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 底部弹出-频道设置 -->
    <van-popup
      class="popup"
      v-model="popShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon="cross"
      close-icon-position="top-left"
    >
      <ChannelEdit
        :channelList="channels"
        :tabIndex="tabIndex"
        @onRecommendItemClick="onAddChannelByEdit"
        @onDeleteMyChannel="onDeleteMyChannel"
        @onSwitchMyChannelTab="onSwitchMyChannelTab"
      />
    </van-popup>
  </div>
</template>

<script>
import { requestUserChannels } from '@/api/channels'
import ArticleList from '@/components/article-list'
import ChannelEdit from '@/views/home/components/ChannelEdit.vue'
import { getItem, setItem } from '@/utils/localStore'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      channels: [],
      tabIndex: '',
      popShow: false
    }
  },
  methods: {
    showChannelPop () {
      this.popShow = true
    },
    onSwitchMyChannelTab (index) {
      this.tabIndex = index
      this.popShow = false
    },
    // 在频道编辑里将推荐频道添加到我的频道触发事件
    onAddChannelByEdit (val) {
      this.channels.push(val)
    },
    // 在频道编辑里删除频道
    onDeleteMyChannel (index) {
      // 如果删除的频道小于或等于当前激活的频道,让index-1
      if (index <= this.tabIndex) {
        this.tabIndex -= 1
      }
      this.channels.splice(index, 1)
    },
    requestChannels (isSaveLocal) {
      requestUserChannels
        .then((res) => {
          const { channels } = res.data.data
          this.channels = channels
          if (isSaveLocal) {
            setItem('TOUTIAO_CHANNELS', channels)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState('loginInfo', ['tokenInfo'])
  },
  created () {
    // 请求频道列表
    if (this.$store.state.loginInfo.tokenInfo) {
      // 已登录，请求服务器数据
      this.requestChannels(false)
    } else {
      // 未登录,先获取本地数据,如果本地没有数据再获取网络数据
      const localData = getItem('TOUTIAO_CHANNELS')
      if (localData) {
        this.channels = localData
      } else {
        this.requestChannels(true)
      }
    }
  },
  watch: {
    // 当登录信息发生改变,重新进行数据初始化
    tokenInfo () {
      this.created()
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  // 移出导航栏和标签栏固定定位的空间
  padding-top: 90px;
  // 为文字列表加载更多留出空间
  padding-bottom: 50px;
  // 导航栏样式定义
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  :deep(.van-icon-search) {
    color: #fff;
    font-size: 16px;
  }
  .btn-search {
    width: 278px;
    height: 32px;
    background-color: #ffffff66;
  }
  // 频道列表Tab栏样式定义
  :deep(.tab-channels) {
    position: relative;
    .van-tabs__wrap {
      position: fixed;
      top: 46px;
      // 左右撑开
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tabs__nav--line {
      height: 45px;
      padding: 0;
      .van-tab {
        min-width: 70px;
        font-size: 14px;
        border-right: 1px solid #edeff3;
        color: #777777;
        &:nth-last-child(4) {
          border-right: 0;
        }
      }
    }
    .van-tab--active {
      font-size: 15px;
      color: #333333;
    }
    .van-tabs__line {
      bottom: 8px;
    }
    .more-holder {
      width: 35px;
      height: 44px;
      flex-shrink: 0;
    }
    .more {
      position: fixed;
      right: 0;
      width: 35px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.9;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 35px;
        background-image: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }

  // 弹出层的关闭按钮样式
  :deep(.van-icon-cross) {
    color: #333333;
  }
}
</style>
