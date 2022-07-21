<template>
  <div class="profile-wrapper">
    <van-nav-bar title="个人资料" left-arrow @click-left="$router.back()" />

    <van-cell title="头像" @click="$refs.file.click()" center is-link>
      <van-image class="avatar" round :src="profile.photo" />
    </van-cell>
    <van-cell title="昵称" :value="profile.name" is-link />
    <van-cell
      title="性别"
      :value="profile.gender === 0 ? '男' : '女'"
      is-link
      @click="showSexPicker = true"
    />
    <van-cell title="生日" :value="profile.birthday" @click="showBirthPicker = true" is-link />

    <van-popup v-model="showSexPicker" round position="bottom">
      <van-picker
        title="请选择性别"
        show-toolbar
        :columns="columns"
        @cancel="showSexPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-popup v-model="showBirthPicker" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>

    <input
      type="file"
      ref="file"
      accept="image/*"
      @change="onFileSelChange"
      hidden
    />
    <van-popup v-model="showImgPreview" position="bottom" style="height: 100%">
      <AvatarPreview
        v-if="showImgPreview"
        :imgData="imgData"
        @onClose="showImgPreview = false"
        @onUploadSuccess="profile.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, setUserProfile } from '@/api/user'
import AvatarPreview from './components/AvatarPreview.vue'

export default {
  name: 'UserProfile',
  components: {
    AvatarPreview
  },
  data() {
    return {
      profile: {},
      columns: ['男', '女'],
      showSexPicker: false,
      showImgPreview: false,
      showBirthPicker: false,
      imgData: null,
      currentDate: new Date(),
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(2200, 12, 31),
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const { data } = await getUserProfile()
        this.profile = data.data
        this.currentDate = new Date(this.profile.birthday)
      } catch (error) {
        this.$toast.fail('请求失败,请重新尝试')
      }
    },
    async requestUpdateProfile(param) {
      try {
        await setUserProfile(param)
        this.$toast.success('修改成功')
        this.loadData()
      } catch (error) {
        this.$toast.fail('请求失败,请重新尝试')
      }
    },
    onConfirm(value, index) {
      this.showSexPicker = false
      this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.requestUpdateProfile({ gender: index })
    },
    onFileSelChange() {
      const file = this.$refs.file
      this.imgData = window.URL.createObjectURL(file.files[0])
      this.showImgPreview = true

      /**
       * file input 如果重复选择同一个文件就不会出发 change
       * 解决办法: 每次使用完毕后清空 value 值
       */
      file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.profile-wrapper {
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .avatar {
      width: 32px;
      height: 32px;
    }
  }
}
</style>