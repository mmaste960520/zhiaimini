<template lang="pug">
  view.data-picker
    picker-view.picker-view(
      :value="selected",
      mask-style="background: rgba(255, 255, 255, 0);",
      indicator-class="indicator",
      @change="bindChange"
    )
      picker-view-column.col(v-for="(col, colIndex) in flatData", :key="colIndex")
        view.col-item(
          v-for="(item, index) in col",
          :key="item",
          :class="{active: index === selected[colIndex], zoom4: item.length > 3, zoom5: item.length > 4 }"
        ) {{ item }}
</template>
<script>
export default {
  data () {
    return {
      selected: this.value
    }
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    name: {
      type: String
    },
    pickerData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    // 把层级数据拍扁
    flatData () {
      let tempPicker = this.pickerData
      let flatData = []
      this.selected.forEach((value, index) => {
        const tempData = []
        tempPicker.forEach(item => {
          tempData.push(item.text)
        })
        flatData[index] = tempData

        tempPicker = tempPicker[value].children
      })

      return flatData
    }
  },
  methods: {
    bindChange (e) {
      const value = e.detail.value

      // 获取起始差异值 Index
      const startDiffIndex = value.findIndex((item, index) => {
        return item !== this.selected[index]
      })

      // 差异值后全部置零
      this.selected = value.fill(0, startDiffIndex + 1)

      // 把选中的值提交给调用方
      this.$emit('change', {
        name: this.name,
        data: this.selected.map((item, index) => this.flatData[index][item])
      })
    }
  }
}
</script>
<style lang="scss" scope>
.data-picker {
  font-size: 32rpx;
  width: 560rpx;
  height: 530rpx;
  margin: 0 auto;
  color: #263459;
  .picker-view {
    height: 530rpx;
    border-radius: 16rpx;
    overflow: hidden;
    background: #efeff1;
    .col {
      line-height: 104rpx;
      z-index: 100;
    }
    .col-item {
      text-align: center;
      &.active {
        transform: scale(1.2 ,1.2);
        color: #dfb47a;
        transition: all 0.1s;
      }
      &.zoom4 {
        font-size: 26rpx;
      }
      &.zoom5 {
        font-size: 22rpx;
      }
    }
    .indicator {
      height: 104rpx;
      background: linear-gradient(180deg, rgba(219,220,224,0.8) 0%, rgba(230,230,233,0.1) 50%, rgba(219,220,224,0.8) 100%);
    }
  }
}
</style>
