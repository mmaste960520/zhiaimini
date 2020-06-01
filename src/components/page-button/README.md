# page-button 组件

## 介绍
小程序通用按钮组件

## 使用
```javascript
import PageButton from '@/components/page-button'

export default {
  components: {
    PageButton
  }
}
```

```pug
//- 缺省使用
page-button  按钮文字
//- 改变大小 size="normal | small", normal 为缺省
page-button(size="small") 按钮文字
//- 按钮不可用状态
page-button(:disalbed="ture") 按钮文字
```
