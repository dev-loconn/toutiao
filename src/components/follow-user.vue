<template>
  <van-button
    v-if="!isFollow"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="isFollowLoading"
    @click="onFollowClick"
  >
    关注
  </van-button>
  <van-button
    v-else
    class="follow-btn"
    round
    size="small"
    :loading="isFollowLoading"
    @click="onFollowClick"
    >已关注</van-button
  >
</template>

<script>
import { followUser, cancelFollowUser } from '@/api/user'
export default {
  name: 'FollowUser',
  props: {
    isFollow: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String,Number],
      required: true
    }
  },
  data() {
    return {
      isFollowLoading: false
    }
  },
  methods: {
    async onFollowClick() {
      this.isFollowLoading = true
      try {
        const isFollow = !this.isFollow
        if (isFollow) {
          // 添加关注
          await followUser({ target: this.userId })
        } else {
          // 取消关注
          await cancelFollowUser(this.userId)
        }
        this.$emit('update-isfollow', isFollow)
      } catch ({ response }) {
        switch (response?.status) {
          case 400:
            this.$toast(response.data.message)
            break
          default:
            this.$toast('网络错误,请重新尝试!')
            break
        }
      }
      this.isFollowLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.follow-btn {
  width: 85px;
  height: 29px;
}
</style>