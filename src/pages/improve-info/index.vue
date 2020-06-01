<template lang="pug">
  view.content.x-background
    dispatcher(
      :info="flow[flowIndex]",
      @action="action",
      @pickerChange="pickerChange",
      @formChange="formChange"
    )
</template>
<script>
import fly from 'fly'
import { sha256 } from 'js-sha256'
import Dispatcher from './dispatcher'
import paths from '@/config/paths'
import {
  marriageStatus,
  areaData,
  edu,
  height
} from './data'

export default {
  data () {
    return {
      phoneReg: /^[a-zA-Z0-9]{6,18}$/,
      formData: {
        gender: '',
        marriageStatus: ['未婚'],
        edu: ['中专'],
        height: ['160', '160'],
        areaData: ['北京市', '北京市', '东城区'],
        password: '',
        passwordAgain: ''
      },
      flowIndex: 0,
      flow: [
        {
          title: '你的性别是',
          type: 'gender',
          disabledBtn: true
        },
        {
          title: '你的婚姻状况',
          type: 'picker',
          pickerName: 'marriageStatus',
          pickerData: marriageStatus,
          pickerDefault: [0],
          stepsIndex: 1
        },
        {
          title: '你的学历是',
          type: 'picker',
          pickerName: 'edu',
          pickerData: edu,
          pickerDefault: [0],
          stepsIndex: 2
        },
        {
          title: '你的身高是',
          type: 'height-picker',
          pickerName: 'height',
          pickerData: height,
          pickerDefault: [4, 0],
          stepsIndex: 3
        },
        {
          title: '你的工作地区在哪里',
          type: 'area-picker',
          pickerName: 'areaData',
          pickerData: areaData,
          pickerDefault: [0, 0, 0],
          stepsIndex: 4
        },
        {
          title: '请设置您的密码',
          type: 'form',
          isFinish: true
        }
      ]
    }
  },
  methods: {
    action (actionName) {
      if (actionName === 'next') {
        this.flowIndex++
      }
      if (actionName === 'finish') {
        if (this.formData.password === '' && this.formData.passwordAgain === '') {
          uni.showToast({
            title: '密码不能为空',
            icon: 'none'
          })
          return
        }
        if (!this.phoneReg.test(this.formData.password) || !this.phoneReg.test(this.formData.passwordAgain)) {
          uni.showToast({
            title: '请输入6-18位非特殊字符的密码',
            icon: 'none'
          })
          return
        }
        if (this.formData.password !== this.formData.passwordAgain) {
          uni.showToast({
            title: '两次输入的密码不同，请重新输入',
            icon: 'none'
          })
          return
        }
        // submit
        fly.post(paths.user.setMyUserInfo, {
          userSex: this.formData.gender,
          liveProvince: this.formData.areaData[0],
          liveCity: this.formData.areaData[1],
          liveArea: this.formData.areaData[2],
          userHeight: this.formData.height[1],
          userEducation: this.formData.edu[0],
          userMarriage: this.formData.marriageStatus[0],
          phonePassword: sha256(this.formData.password)
        }).then(data => {
          if (data.data.rsCode === '503') {
            uni.showToast({
              title: '服务器繁忙',
              icon: 'none'
            })
            return
          }
          if (data.data.rsCode === '302') {
            uni.showToast({
              title: '用户名或密码错误',
              icon: 'none'
            })
            return
          }
          // 跳转页面
          if (data.data.rsCode === '200') {
            uni.showToast({
              title: '注册成功',
              icon: 'none'
            })
            setTimeout(() => {
              this.toCountDown()
            }, 2000)
          }
        })
      }
    },
    pickerChange (result) {
      const { name, data } = result
      this.formData[name] = data
    },
    formChange (data) {
      const { first, again, gender } = data

      if (first) {
        this.formData.password = first
      }
      if (again) {
        this.formData.passwordAgain = again
      }
      if (gender) {
        this.formData.gender = gender
      }
    },
    toCountDown () {
      uni.switchTab({
        url: '/pages/boutique-recommend/index'
      })
    }
  },
  onShow () {
    const token = uni.getStorageSync('token')
    const result = uni.getStorageSync('result')
    if (token && result === '0') {
      uni.redirectTo({
        url: '/pages/count-down/index'
      })
    }
  },
  components: {
    Dispatcher
  },
  onShareAppMessage: function () {
    return {
      title: '关于我们',
      path: '/pages/count-down/index',
      success: (res) => {

      },
      fail: function (res) {
      }
    }
  }
}
</script>
<style lang="scss" scope>
  .content {
    box-sizing: border-box;
    padding: 50rpx 31rpx 47rpx 31rpx;
    height: 1163rpx;
    overflow-y: hidden;
    overflow-x: hidden;
  }
</style>
