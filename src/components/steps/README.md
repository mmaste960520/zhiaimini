# Steps 组件

## 介绍
用于展示流程进入了第几步的 UI 组件

## 使用
```javascript
import Steps from '@/components/steps'

export default {
  components: {
    Steps
  }
}
```

```pug
// total 表示总步骤数
// step 表示当前在第几步
steps(:total="4", :step="2")
```
