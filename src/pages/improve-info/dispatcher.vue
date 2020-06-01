<template lang="pug">
  view.content
    view.item
      //- 标题
      page-title.title(:title="info.title")

      //- 性别选择
      gender.gender(
        v-if="info.type === 'gender'",
        @cardClick="cardClick"
      )

      //- 通用 Picker 选择
      data-picker.picker(
        v-if="info.type === 'picker'",
        :picker-data="info.pickerData",
        :value="info.pickerDefault",
        :name="info.pickerName",
        @change="pickerChange"
      )

      //- 身高 Picker 选择
      //- 不能复用通用 Picker 是因为组件 bug, value 值 length 改变不生效
      data-picker.picker(
        v-if="info.type === 'height-picker'",
        :picker-data="info.pickerData",
        :value="info.pickerDefault",
        :name="info.pickerName",
        @change="pickerChange"
      )

      //- 地区 Picker 选择
      //- 不能复用通用 Picker 是因为组件 bug, value 值 length 改变不生效
      data-picker.picker(
        v-if="info.type === 'area-picker'",
        :picker-data="info.pickerData",
        :value="info.pickerDefault",
        :name="info.pickerName",
        @change="pickerChange"
      )

      // 设置密码表单
      set-user-password.set-user-password(v-if="info.type === 'form'", @change="formChange")

      // 按钮
      page-button.next-btn(v-if="!info.disabledBtn", :btn-content="btnText", @click.native="next")

      // 步骤展示
      steps.progress(v-if="info.stepsIndex", :total="4", :step="info.stepsIndex")
</template>
<script>
import PageTitle from '@/components/page-title'
import Gender from '@/components/gender'
import DataPicker from '@/components/data-picker'
import Steps from '@/components/steps'
import SetUserPassword from '@/components/set-user-password'
import PageButton from '@/components/page-button'

export default {
  props: {
    info: {
      type: Object
    }
  },
  computed: {
    btnText () {
      if (this.info.isFinish) {
        return '完成'
      }
      return '下一步'
    }
  },
  methods: {
    next () {
      const actionName = this.info.isFinish
        ? 'finish'
        : 'next'
      this.$emit('action', actionName)
    },
    cardClick (gender) {
      this.formChange({
        gender
      })
      this.next()
    },
    pickerChange (data) {
      this.$emit('pickerChange', data)
    },
    formChange (data) {
      this.$emit('formChange', data)
    }
  },
  components: {
    PageTitle,
    Gender,
    DataPicker,
    Steps,
    PageButton,
    SetUserPassword
  }
}
</script>
<style lang="scss" scope>
  .content {
    background: #fcfcfd;
    border-radius: 24rpx;
    height: 1080rpx;
    .item {
      margin-left: -29rpx;
      .title {
        display: block;
        margin-left: 17rpx;
      }
      .gender {
        display: block;
      }
      .picker {
        display: block;
        margin: 34rpx 0 104rpx 36rpx;
      }
      .set-user-password {
        margin-top: 12rpx;
      }
      .next-btn {
        display: block;
        margin-top: 160rpx;
      }
      // .next-btn:active {
        // width: 262rpx;
        // height: 72rpx;
      //   color: #b27e41;
      //   background: linear-gradient(#ffd6a3 30%, #ffd6a3 60%, #ffd6a3 100%);
      // }
      .progress {
        display: block;
        margin-top: 30rpx;
      }
    }
  }
</style>
