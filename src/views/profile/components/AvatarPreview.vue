<template>
  <div class="preview-wrapper">
    <img id="image" class="img" :src="imgData" ref="avatar" />

    <div class="bot">
      <span @click="$emit('onClose')">取消</span>
      <span @click="onConfirm">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { uploadAvatar } from '@/api/user'

export default {
  name: 'AvatarPreview',
  props: {
    imgData: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  mounted() {
    const image = this.$refs.avatar
    this.cropper = new Cropper(image, {
      aspectRatio: 1, // 截图区域 1比1
      viewMode: 1, // 限制截图区域在画布内
      dragMode: 'move',
      background: false
    })
  },
  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.uploadBlob(blob)
      })
    },
    // 上传裁剪后的图片
    uploadBlob(blob) {
      const formData = new FormData()
      formData.append('photo', blob)
      this.$toast.loading({
        message: '正在上传...',
        forbidClick: false
      })
      uploadAvatar(formData)
        .then(({ data }) => {
          this.$toast.success('上传成功')
          const { photo } = data.data
          // 关闭弹层
          this.$emit('onClose')
          // 更新个人资料界面的头像
          this.$emit('onUploadSuccess', photo)
        })
        .catch((error) => {
          this.$toast.fail('上传失败,请重新尝试')
        })
    }
  }
}
</script>

<style scoped lang="less">
.preview-wrapper {
  height: 100%;
  background-color: #000;
  .img {
    display: block;
    max-width: 100%;
  }
  .bot {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 16px;
    span {
      padding: 16px;
    }
  }
}
</style>