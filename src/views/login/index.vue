<template>
  <div class="login-wrap">
    <van-nav-bar title="登录">
      <template #left>
        <van-icon @click="$router.back()" name="cross" />
      </template>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onLogin" ref="loginForm">
      <van-field
        v-model="loginInfo.mobile"
        placeholder="请输入手机号"
        maxlength="11"
        name="mobile"
        center
        clearable
        :rules="mobileRules"
      >
        <template #left-icon>
          <i class="tt tt-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="loginInfo.code"
        type="number"
        clearable
        maxlength="6"
        center
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #left-icon>
          <i class="tt tt-yanzhengma"></i>
        </template>
        <template #button>
          <!-- 验证码倒计时 -->
          <van-count-down
            v-if="isCountDown"
            :time="1000 * 60"
            @finish="isCountDown = false"
          >
            <template #default="timeData">
              <span class="countDown">{{ timeData.seconds }} 秒</span>
            </template>
          </van-count-down>
          <van-button
            v-else
            @click="sendCodeFn"
            native-type="button"
            class="verify-btn"
            round
            size="small"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button
          :loading="isLoading"
          :disabled="isLoading"
          loading-text="正在登录..."
          block
          type="info"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { mapActions } from 'vuex'

export default {
  name: 'LoginIndex',
  data () {
    return {
      loginInfo: {
        mobile: '',
        code: '246810'
      },
      // 手机号验证规则
      mobileRules: [
        {
          required: true,
          pattern: /^\d{11}$/,
          message: '请输入11位手机号'
        }
      ],
      // 验证码验证规则
      codeRules: [
        {
          required: true,
          pattern: /^\d{6}$/,
          message: '请输入六位验证码'
        }
      ],
      // 请求中
      isLoading: false,
      // 验证码倒计时中
      isCountDown: false
    }
  },
  methods: {
    ...mapActions('loginInfo', ['updateTokenInfoAction']),
    // 登录
    async onLogin () {
      this.isLoading = true
      try {
        const {
          data: { data }
        } = await login(this.loginInfo)
        // 保存获取到的Token数据
        this.updateTokenInfoAction(data)
        this.$router.back()
        this.$toast.success('登录成功')
      } catch ({ response }) {
        this.$toast.fail(response.data.message)
      }
      this.isLoading = false
    },
    // 获取验证码
    async sendCodeFn () {
      try {
        // 验证手机号
        await this.$refs.loginForm.validate('mobile')
        this.isCountDown = true
      } catch (err) {
        this.isCountDown = false
        return console.log(err)
      }

      // 验证通过发起请求
      try {
        // 验证手机号
        await this.$refs.loginForm.validate('mobile')
        this.isCountDown = true
        // 验证通过发起请求
        await sendCode(this.loginInfo.mobile)
      } catch ({ response }) {
        this.isCountDown = false
        this.$toast.fail(response.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tt-shouji,
.tt-yanzhengma {
  font-size: 20px;
}
.verify-btn {
  background-color: #ededed;
  color: #666666;
  border: none;
  width: 80px;
  height: 23px;
  line-height: 23px;
  font-size: 11px;
}
.login-btn-wrap {
  margin: 30px 16px;
  .van-button {
    background-color: #3296fa;
  }
}
.countDown {
  display: inline-block;
  background-color: #ededed;
  color: #666666;
  text-align: center;
  border-radius: 12px;
  width: 80px;
  height: 23px;
  line-height: 23px;
  font-size: 11px;
}
</style>
