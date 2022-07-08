<template>
  <div>
    <van-cell
      v-for="(item, index) in suggestionList"
      :key="index"
      icon="search"
      @click="$emit('onSuggestionClick', item)"
    >
      <template #title>
        <span v-html="highlightText(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce, replace } from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestionList: []
    }
  },
  created() {
    this.requestSuggestionList(this.searchText)
    console.log(this.searchText);
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (val) {
        // 防抖函数
        this.requestSuggestionList(val)
      }, 300)
    }
  },
  methods: {
    async requestSuggestionList(text) {
      const res = await getSuggestion(text)
      const { options } = res.data?.data
      this.suggestionList = options[0] ? options : []
    },
    // 高亮搜索关键字
    highlightText(text) {
      return replace(text, this.searchText, `<span style="color:#3296fa;">${this.searchText}</span>`)
    }
  }
}
</script>

<style>
</style>