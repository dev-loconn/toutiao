<template>
  <div>
    <!-- 已登录布局 -->
    <div v-if="tokenInfo" class="user login">
      <div class="userinfo">
        <van-image class="avatar" round fit="cover" :src="profile.photo" />
        <span class="uname">{{ profile.name }}</span>
        <span class="edit-info" @click="$router.push('/profile')">编辑资料</span>
      </div>
      <div class="data-count">
        <div class="count">
          <span>{{ profile.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="count">
          <span>{{ profile.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="count">
          <span>{{ profile.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="count">
          <span>{{ profile.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录布局 -->
    <div v-else class="user logout">
      <div @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" />
        <span>登录 / 注册</span>
      </div>
    </div>
    <!-- 宫格导航 -->
    <van-grid class="grid-nav" clickable :column-num="2">
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="tt tt-shoucang"></i>
        </template>
        <template #text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="tt tt-lishi"></i>
        </template>
        <template #text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- cell -->
    <div class="func-cell">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <div v-if="tokenInfo" class="btn-logout" @click="logout">退出登录</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUser } from '@/api/user.js'

export default {
  name: 'MineIndex',
  data() {
    return {
      profile: {}
    }
  },
  computed: {
    ...mapState('loginInfo', ['tokenInfo'])
  },
  methods: {
    // 退出登录
    logout() {
      this.$store.dispatch('loginInfo/updateTokenInfoAction', null)
    }
  },
  async created() {
    if (!this.tokenInfo) return
    try {
      const { data } = await getUser()
      this.profile = data.data
    } catch ({ response }) {
      if (response?.status === 401) {
        this.$toast.fail('身份认证失败')
        this.$store.dispatch('loginInfo/updateTokenInfoAction', null)
      } else {
        this.$toast.fail('请求失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.user {
  width: 100%;
  height: 200px;
  background: url('~@/assets/banner.png') no-repeat;
  background-size: cover;
}
// 未登录样式
.logout {
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 66px;
      height: 66px;
    }
    span {
      margin-top: 8px;
      font-size: 16px;
      color: #fff;
    }
  }
}
// 已登录样式
.login {
  .userinfo {
    display: flex;
    align-items: center;
    width: 100%;
    height: 130px;
    .avatar {
      width: 64px;
      height: 64px;
      border: 2px solid #fff;
      margin: 0 10px;
    }
    span {
      font-size: 15px;
      color: #fff;
    }
    .uname {
      margin-right: auto;
    }
    .edit-info {
      width: 60px;
      height: 22px;
      background-color: #fff;
      border-radius: 11px;
      margin-right: 10px;
      font-size: 12px;
      text-align: center;
      line-height: 22px;
      color: #666;
    }
  }
  .data-count {
    display: flex;
    width: 100%;
    height: 70px;
    .count {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 15px;
      line-height: 20px;
    }
  }
}
// 宫格导航
.grid-nav {
  .grid-item {
    .tt-shoucang {
      font-size: 23px;
      color: #eb5253;
    }
    .tt-lishi {
      font-size: 23px;
      color: #ff9d1d;
    }
    .text {
      margin-top: 5px;
      font-size: 16px;
      color: #333333;
    }
  }
}
.func-cell {
  margin-top: 5px;
}
.btn-logout {
  width: 100%;
  height: 45px;
  margin-top: 5px;
  text-align: center;
  line-height: 45px;
  background-color: #fff;
  color: #d86262;
  font-size: 16px;
}
</style>
