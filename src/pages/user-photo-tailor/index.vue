<template lang="pug">
  view.photo-tailor
    picture-tailor(:avatarSrc="url", selWidth="660rpx", selHeight="660rpx", @upload="myUpload", ref="tailor", avatarStyle="width:100vw;height:100vw;")
</template>
<script>

import PictureTailor from '@/components/picture-tailor/index'
import fly from 'fly'
import path from '../../config/paths'
import testApi from '../../config/domains'
export default {
  components: {
    PictureTailor
  },
  data () {
    return {
      tailorUrl: ''
    }
  },
  computed: {
  },
  onLoad (option) {
    this.$refs.tailor.setFile(option.path)
  },
  methods: {
    myUpload (rsp) {
      console.log(rsp)
      uni.uploadFile({
        url: testApi.devBaseUrl + '' + path.netease.iAcsCheckImageFileMult,
        header: {
          'content-type': 'multipart/form-data',
          uuid: uni.getStorageSync('uuid')
        },
        filePath: rsp.path,
        name: 'file',
        formData: {
          type: 1,
          sub_type: 1
        },
        success: (uploadFileRes) => {
          const rsBackData = JSON.parse(uploadFileRes.data)
          if (rsBackData.rsObject.action !== '2') {
            uni.showToast({
              title: '照片不合规',
              icon: 'none',
              duration: 1000
            })
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/user-center/index'
              })
            }, 1009)
          }
          if (rsBackData.rsObject.action === '2') {
            const bucketName = rsBackData.rsObject.profilePhotoid.split(';', 1)[0]
            const filePath = rsBackData.rsObject.profilePhotoid.split(';', 2)[1]
            fly.post(path.oss.getOssUrl, {
              bucketName: bucketName,
              filePath: filePath
            }).then(data => {
              if (data.data.rsCode === '200') {
                this.tailorUrl = data.data.rsObject
                fly.post(path.user.updateAvatar, {
                  auditPhotoid: bucketName + ';' + filePath
                }).then(data => {
                  uni.switchTab({
                    url: '/pages/user-center/index'
                  })
                })
              }
            })
          }
        }
      })
    }
    // myUpload (rsp) {
    //   console.log(rsp)
    //   uni.uploadFile({
    //     url: testApi.devBaseUrl + '' + path.oss.formUploadFile,
    //     header: {
    //       'content-type': 'multipart/form-data',
    //       uuid: uni.getStorageSync('uuid')
    //     },
    //     filePath: rsp.path,
    //     name: 'file1',
    //     formData: {
    //       type: 1,
    //       sub_type: 1
    //     },
    //     success: (uploadFileRes) => {
    //       const rsBackData = JSON.parse(uploadFileRes.data)
    //       const bucketName = rsBackData.rsObject[0].bucketName
    //       const filePath = rsBackData.rsObject[0].filePath
    //       fly.post(path.oss.getOssUrl, {
    //         bucketName: bucketName,
    //         filePath: filePath
    //       }).then(data => {
    //         if (data.data.rsCode === '200') {
    //           this.tailorUrl = data.data.rsObject
    //           fly.post(path.user.updateAvatar, {
    //             auditPhotoid: bucketName + ';' + filePath
    //           }).then(data => {
    //             uni.switchTab({
    //               url: '/pages/user-center/index'
    //             })
    //           })
    //         }
    //       })
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss" scope>
  .photo-tailor {
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
