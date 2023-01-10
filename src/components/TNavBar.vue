<template>
  <nav class="nav">
    <ul>
      <li v-for="link in links" :key="link.label">
        <span v-if="$route.path === link.path">{{ link.label }}</span>
        <router-link v-else :to="link.path">{{ link.label }}</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>

export default {
  name: 'TNavBar',
  props: {
    links: {
      type: Array,
      required: true
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'

nav.nav
  background: $primary
  height: 50px
  display: flex
  align-items: center
nav.nav > ul
  margin: 0
  list-style-type: none
  display: flex
  flex-direction: row
  justify-content: space-between
  flex-grow: 1
  padding: 0 1rem
nav.nav a
  color: $secondary
  text-decoration: none
  cursor: pointer
  display: block
  transition: transform .5s ease
  &:hover
    transform: scale(1.2)
nav.nav > ul li span
  color: $tertiary




</style>