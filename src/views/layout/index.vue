<template>
  <div class="layout-wrap">
    <router-view />
    <!-- 底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item to="/home">
        <template #icon>
          <i class="tt tt-shouye"></i>
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="tt tt-wenda"></i>
        </template>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="tt tt-shipin"></i>
        </template>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/mine">
        <template #icon>
          <i class="tt tt-wode"></i>
        </template>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style>
</style>
