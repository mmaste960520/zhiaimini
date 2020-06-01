/**
 * 通用随机函数工具集
 *
 */
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

/**
 * 随机字母
 *
 * @param length
 * @returns {string}
 */
function randomLetter (length) {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length))
  }
  return result
}

/**
 * 随机小写字母
 *
 * @param length
 * @returns {string}
 */
function randomLowerLetter (length) {
  return randomLetter(length).toLowerCase()
}

/**
 * 随机大写字母
 *
 * @param length
 * @returns {string}
 */
function randomUpperLetter (length) {
  return randomLetter(length).toUpperCase()
}

/**
 * 随机数字字符串
 *
 * @param length
 * @returns {string}
 */
function randomNumber (length) {
  return Math.random().toFixed(length).split('.')[1]
}

export {
  randomLetter,
  randomLowerLetter,
  randomUpperLetter,
  randomNumber
}
