<template>
  <div class="accordeon">
    <div class="title" @click="onHeaderClicked">
      <div class="title-label">{{  title  }}</div>
      <div class="title-arrow">
        <div class="arrow-down" :class="{ 'arrow-down-rotated': showContent }">&#60;</div>
      </div>
    </div>

    <transition name="roll-down">
      <div v-if="showContent" class="content">
        <slot name="content"></slot>
      </div>
    </transition>

  </div>
</template>

<script>

export default {
  name: 'TAccordeon',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showContent: false
    }
  },
  methods:{
    onHeaderClicked () {
      this.showContent = !this.showContent
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
@import '../styles/transitions.styl'
.accordeon
  max-width: 500px
  margin: 0 auto
.title
  border: 1px solid #cdcdcd
  display: flex
  justify-content: space-between
  cursor: pointer

// .arrow-down
//   width: 0
//   height: 0
//   border-left: 10px solid transparent
//   border-right: 10px solid transparent
//   border-top: 15px solid $primary
//   transition: transform .3s ease

.arrow-down
  font-size: 1.4rem
  font-weight: bold
  transform: rotate(-90deg)
  transition: transform .3s ease

.arrow-down-rotated
  transform: rotate(90deg)
.title-label
  padding: $list-items-padding
  flex-grow: 1
  text-align: left
  font-weight: bold
  display: flex
  align-items: center
.title-arrow
  display: flex
  justify-content: center
  align-items: center
  padding: $list-items-padding
.content
  border: 1px solid #cdcdcd
  border-top: none
  // padding: 10px 20px
</style>