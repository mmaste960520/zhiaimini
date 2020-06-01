/**
 * 获取 OSS URL
 */
import fly from 'fly'
import paths from '@/config/paths'

/**
 * getOssUrl
 *
 * @param args 字符串 or 对象
 * @returns {string}
 */
export default function getOssUrl (args) {
  let { bucketName, filePath } = args

  if (typeof args === 'string') {
    const argsArr = args.split(';')
    bucketName = argsArr[0]
    filePath = argsArr[1]
  }

  return new Promise((resolve, reject) => {
    fly.post(paths.oss.getOssUrl, {
      bucketName,
      filePath
    }).then(data => {
      if (data.data.rsCode === '200') {
        resolve(data.data.rsObject)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
