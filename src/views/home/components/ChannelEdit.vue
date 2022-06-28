<template>
  <div class="popup-content">
    <div class="title">
      <span>编辑频道</span>
    </div>

    <van-cell center title="我的频道" :border="false">
      <template #right-icon>
        <van-button round type="danger" size="mini">编辑</van-button>
      </template>
    </van-cell>
    <van-grid class="channel-my" :gutter="10">
      <van-grid-item
        v-for="myChannel in channelList"
        :key="myChannel.id"
        :text="myChannel.name"
        icon="clear"
      />
    </van-grid>

    <van-cell center title="频道推荐" :border="false" />
    <van-grid class="channel-recommend" :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" text="文字" icon="plus" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  props: {
    channelList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
// 弹出层
.popup-content {
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    height: 50px;
  }

  .van-cell {
    .van-cell__title {
      font-size: 16px;
      color: #333333;
    }
    .van-button {
      width: 52px;
      height: 24px;
      background-color: #fff;
      color: #f86363;
      border: 1px solid #f86363;
    }
  }

  /deep/ .van-grid {
    .van-grid-item {
      .van-grid-item__content {
        background-color: #f4f5f6;
        height: 43px;
      }
    }
  }

  // 我的频道
  /deep/ .channel-my {
    .van-grid-item {
      .van-grid-item__content {
        position: relative;
        border: unset;
        border-radius: 3px;
        .van-icon {
          position: absolute;
          top: -6px;
          right: -6px;
          font-size: 16px;
          color: #ccc;
          z-index: 2;
        }
        .van-grid-item__text {
          margin-top: 0;
          margin-left: 2px;
          color: #222222;
          font-size: 12px;
          white-space: nowrap;
        }
      }
      [class*='van-hairline']::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: unset;
        -webkit-transform: unset;
        transform: unset;
      }
    }
  }

  // 频道推荐
  /deep/ .channel-recommend {
    margin-top: 10px;
    .van-grid-item {
      .van-grid-item__content {
        flex-direction: row;
        border: unset;
        border-radius: 3px;

        .van-icon {
          font-size: 13px;
          color: #222222;
        }
        .van-grid-item__text {
          margin-top: 0;
          margin-left: 2px;
          color: #222222;
          font-size: 12px;
        }
      }
      [class*='van-hairline']::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: unset;
        -webkit-transform: unset;
        transform: unset;
      }
    }
  }
}
</style>
