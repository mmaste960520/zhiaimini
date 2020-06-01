# pages-header 组件

## 介绍
小程序通用头部组件

## 使用
```javascript
import PageButton from '@/components/pages-header'
export default {
  components: {
    PageButton
  }
}
```

```
//- 左边只有按钮的带返回
传入text即可
text 返回按钮旁边的文字
例如 ： text: '大厅'

//- tab切换卡
传入selectType即可
selectType： 切换卡的的对象
例如：
selectType: [
  {
    type: '试播区',
    hint: true
  },
  {
    type: '诚信区',
    hint: false
  }
]

//- title
中只有文字标题
titleStyle
自定义样式





事件
tabChange返回执行的选中的下标
```
