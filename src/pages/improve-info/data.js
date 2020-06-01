/**
 * Picker 选择器数据配置文件
 */

// 地区数据
const areaData = require('@/config/area.json')

// 婚姻状况数据
const marriageStatus = [
  { text: '未婚' },
  { text: '离异' },
  { text: '丧偶' }
]

// 学历数据
const edu = [
  { text: '中专' },
  { text: '高中' },
  { text: '大专' },
  { text: '本科' },
  { text: '硕士' },
  { text: '博士' }
]

// 身高数据
const height = heightGen(12, 23)

/**
 * 身高数据生成
 *
 * @param {number} min - 最小身高 15 => 150cm
 * @param {number} max - 最大身高 20 => 200cm
 * @returns {array} 身高范围数据
 */
function heightGen (min, max) {
  const heightData = []
  for (let range = min; range < max; range++) {
    const children = []
    for (let age = range * 10; age < range * 10 + 10; age++) {
      children.push({
        text: age.toString()
      })
    }
    heightData.push({
      text: (range * 10).toString(),
      children
    })
  }
  return heightData
}

export {
  areaData,
  marriageStatus,
  edu,
  height
}
