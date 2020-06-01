<template lang="pug">
  div.app-pages-header
    pages-header( :selectType="selectType", @selectBtn="selectBtn")
    view.picture
      image(:src="tempFilePath")
      picture-tailor(selWidth="660rpx", selHeight="660rpx", @upload="myUpload", avatarStyle="height: 250rpx; width: 250rpx;")
</template>
<script>
import PagesHeader from '@/components/pages-header/index'
import PictureTailor from '@/components/picture-tailor/index'
export default {
  name: 'index',
  data () {
    return {
      title: '这是自定义标题',
      text: '大厅',
      selectType: [
        {
          type: '试播区',
          hint: true
        },
        {
          type: '诚信区',
          hint: false
        }
      ],
      tempFilePath: require('./broadcast_bg_guanb.png'),
      titleStyle: `background:#c0f`
    }
  },
  components: {
    PagesHeader,
    PictureTailor
  },
  methods: {
    selectBtn (i) {
      console.log(i)
    },
    myUpload (rsp) {
      // const self = this
      this.tempFilePath = rsp.path // 更新头像方式一
      // // rsp.avatar.imgSrc = rsp.path; //更新头像方式二
      console.log(rsp)
    }
  },
  onPageShow () {
    const _this = this.$mp.page
    if (typeof _this.getTabBar === 'function' &&
      _this.getTabBar()) {
      _this.getTabBar().setData({
        selected: 1
      })
    }
  }
}
</script>
<style lang="scss">
.app-pages-header{
  width: 100%;
  .picture{
    height:250rpx;
    width: 250rpx;
    position: relative;
    image{
      height:100%;
      width: 100%;
      position: absolute;
      top:0;
      left: 0;
      border-radius: 50%;
    }
  }
}
</style>
