<template>
  <button
    @click="onClick"
    :class="{ 'btn-small': smallSize }"
    :type="btnType"
  >{{ label }}</button>
</template>

<script>

export default {
  name: 'TButton',
  props: {
    smallSize: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    btnType: {
      type: String,
      default: 'submit'
    }
  },
  methods: {
    onClick () {
      this.$emit('clicked')
    }
  }
}


</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
button
  background: $primary
  color: $secondary
  padding: .4em .8em
  transition: all .3s ease
  border-radius: $border-radius
  font-size: 1.2rem
  border: none
  cursor: pointer
  &:hover
    color: $tertiary

.btn-small
  font-size: 1rem
  background: transparent
  color: darken($tertiary, 50)
  &:hover
    background: lighten($secondary, 20)
    color: $primary
</style>