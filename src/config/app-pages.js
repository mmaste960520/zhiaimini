/**
 * 嵌入网页配置
 */
const baseUrlConfig = {
  prod: 'https://zhiai.live/app-pages',
  dev: 'https://dev.zhiai.live/app-pages'
}

const appPages = {
  activitiesList: '/activities-list.html',
  feedback: '/advice-feed-back.html',
  profile: '/personal-homepage.html',
  rechargeServiceAgree: ' /app-pages/protocols.html#/',
  activeDetail: '/active-detail.html',
  livingDetail: '/live-detail.html',
  myActive: '/activities-list.html',
  vipAuthority: '/app-pages/member.html#'
}

const appPagesConfig = {}
const baseURL = process.env.NODE_ENV === 'production' ? baseUrlConfig.prod : baseUrlConfig.dev
Object.keys(appPages).forEach(key => {
  appPagesConfig[key] = baseURL + appPages[key]
})

export default appPagesConfig
