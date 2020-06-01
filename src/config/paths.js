/**
 * API PATH 配置文件
 * http://rap2.zhiai2019.com/
 */
export default {
  sms: {
    // 短信验证码接口
    getSMSVerifyCode: '/sms/msgVerification/getSMSVerifyCode',
    verifySMSCode: '/sms/msgVerification/verifySMSCode/'
  },
  account: {
    accountAuth: '/acc/login/accountAuth',
    // 验证码登陆
    codeAuth: '/acc/login/codeAuth',
    // 三方登陆
    thirdAuth: '/acc/login/thirdAuth',
    // 游客模式
    visitorAuth: '/acc/login/visitorAuth',
    // 退出登录
    userLogout: '/acc/login/userLogout',
    // 邀请码验证及使用
    inviteCodeVerify: '/acc/login/inviteCodeVerify'
  },
  user: {
    // 用户信息设置
    setMyUserInfo: '/user/info/setMyUserInfo',
    // 倒计时
    countDown: '/user/countdown/getCountdownDate',
    // 获取用户信息: 卡片
    getUserInfo: '/user/info/getUserInfo',
    // 更新用户头像
    updateAvatar: '/user/info/updateMyUserHead',
    // 更新礼品券
    updateGiftCard: '/user/star/getBalance',
    // 获取会员时效信息
    getUserCardInfo: '/user/card/getUserCardInfo',
    // 获取当前用户礼品券余额
    getBalance: '/user/star/getBalance',
    // 用户背包
    userPackage: '/user/star/loadPacksack',
    // 获取当前充值卡列表
    getRechargeCardList: '/user/card/getRechargeCardList',
    // 获取推荐用户信息列表
    getRecommendUsersInfoList: '/user/info/getRecommendUsersInfoList',
    // 获取游客首页推荐列表
    getRecommendUsersInfoPage: '/user/info/getRecommendUsersInfoPage'
  },
  gift: {
    getGiftList: '/gift/gift/getGiftList',
    getGiftListByArea: '/gift/gift/getReginonGiftInfo'
  },
  wechat: {
    jscodeToSession: '/wx/wxuser/jscodeToSession'
  },
  oss: {
    getOssUrl: '/oss/oss/getPresignedUrl',
    // 表单上传多文件
    formUploadFile: '/oss/oss/uploadFile'
  },
  activity: {
    // 获取官方专题列表
    getOfficialLiveList: '/activity/activity/getBanner/getOfficialLiveList',
    // 获取活动专区列表
    getOfficialActivityList: '/activity/activity/getBanner/getOfficialActivityList',
    // 获取banner
    getBannerActivityList: '/activity/activity/getBanner/getBannerActivityList'
  },
  live: {
    getLiveRoomInfo: '/live/netease/getLiveRoomInfo',
    joinLiveRoom: '/live/netease/joinLiveRoom',
    getLiveRegions: '/live/netease/getLiveRegions',
    getLiveList: '/live/netease/getLiveList',
    getJoinStatus: '/live/permission/getUserPermMpJoinLiveRoomInfo'
  },
  // 阿里图片检测(文件上传,简化)
  netease: {
    iAcsCheckImageFileMult: '/netease/iacs/iAcsCheckImageFileMult'
  },
  // 短信验证码接口
  requireVerificationCode: '/sms/sms/msgVerification/getSMSVerifyCode',
  // 三方接口
  codeAuth: '/acc/login/codeAuth',
  // 用户信息设置
  setUserInfo: '/user/info/setMyUserInfo',
  // 倒计时
  countDown: '/user/countdown/getCountdownDate'
}
