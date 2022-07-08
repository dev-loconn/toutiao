<template>
  <div class="result-wrapper">
    <van-cell class="title" title="搜索历史" />
    <van-cell :title="item" v-for="(item, index) in searchHistory" :key="index" @click="$emit('onSearch', item)">
      <template #right-icon>
        <van-icon name="delete" @click.stop="$emit('onDelete', index)" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped lang="less">
.result-wrapper {
  .title {
    font-weight: 700;
  }
}
</style>