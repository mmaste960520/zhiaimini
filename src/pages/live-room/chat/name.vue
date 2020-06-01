<template lang="pug">
  span.name(:class="gender") {{ name }}
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: 'man',
      validator (value) {
        return ['', 'man', 'woman'].indexOf(value) !== -1
      }
    }
  }
}
</script>
<style lang="scss" scope>
.name {
  color: #88dfff;
  &.man {
    color: #88dfff;
  }
  &.woman {
    color: #ed7dad;
  }
}
</style>
