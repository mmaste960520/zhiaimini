# GPS icon 组件

## 介绍
通用 gps 组件

## 使用
```javascript
import GpsIcon from '@/components/gps-icon'

export default {
  components: {
    GpsIcon
  }
}
```

```pug
// city 传入城市名称
// trust 表示 GPS 开启, 可信任, 缺省为 true
gps-icon(city="西安", :trust="false")
```
