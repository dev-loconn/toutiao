<template>
  <div class="search-wrapper">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
        @input="onInput"
        background="#3296fa"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isSearchResult" :searchText="searchText" />
    <!-- 搜索建议 -->
    <search-suggestion
      @onSuggestionClick="onSearch"
      v-else-if="searchText"
      :searchText="searchText"
    />
    <!-- 搜索历史 -->
    <search-history v-else :searchHistory="searchHistory" @onSearch="onSearch" @onDelete="onDelete"/>
  </div>
</template>

<script>
import SearchResult from '@/views/search/components/search-result.vue'
import SearchHistory from '@/views/search/components/search-history.vue'
import SearchSuggestion from '@/views/search/components/search-suggestion.vue'
import { getItem,setItem } from '@/utils/localStore'

export default {
  name: 'Search',
  components: {
    SearchResult,
    SearchHistory,
    SearchSuggestion
  },
  data() {
    return {
      searchText: '',
      searchResult: [],
      searchHistory: getItem('searchHistory') || [],
      isSearchResult: false
    }
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      this.isSearchResult = true
      const index = this.searchHistory.indexOf(val)
      // 如果历史记录数组里已经有,就先清除掉
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      // 将最新搜索添加到数组第一位
      this.searchHistory.unshift(val)
    },
    onCancel() {
      if(this.searchText){
        this.searchText = ''
        this.isSearchResult = false
      } else {
        this.$router.back()
      }
      
    },
    onInput(val) {
      this.searchText = val
    },
    onFocus() {
      this.isSearchResult = false
    },
    onDelete(index) {
      this.searchHistory.splice(index, 1)
    }
  },
  watch: {
    searchHistory(val){
      // 保存历史记录到本地存储
      setItem('searchHistory',this.searchHistory)
    }
  }
}
</script>

<style scoped lang="less">
.search-wrapper {
  .van-search__action {
    color: #fff;
  }
}
</style>