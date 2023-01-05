<template>
  <button>click me</button>
</template>

<script>

export default {
  name: 'TButton'
}

</script>

<style lang="stylus">
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

</style>