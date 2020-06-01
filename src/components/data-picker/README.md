# Data picker 组件

## 介绍
用作单级或多级联动的滚动选择 UI 组件

## 使用
```javascript
import DataPicker from '@/components/data-picker'

export default {
  data () {
    return {
      // 示例数据格式
      pickerData1: [
        {
          text: '中专'
        },
        {
          text: '大专'
        },
        {
          text: '本科'
        }
      ],
      pickerData2: [
        {
          text: '中专',
          children: [
            {
              text: '中专弟弟'
            },
            {
              text: '中专妹妹'
            }
          ]
        {
          text: '大专'
        },
        {
          text: '本科'
        }
      ]
    }
  },
  methods: {
    // 监听组件值更新
    pickerChange (data) {
      console.log(data)
    }
  },
  components: {
    DataPicker
  }
}
```

```pug
// value 为初始化选择值

// 单级
data-picker(:picker-data="pickerData1", :value="[0]", @change="pickerChange")
// 多级联动
data-picker(:picker-data="pickerData2", :value="[3, 0, 0]", @change="pickerChange")
```
