<template>
  <nav>
    <ul>
      <li v-for="link in links" :key="link.label">
        <span v-if="$route.path === link.path">{{ link.label }}</span>
        <router-link v-else :to="link.path">{{ link.label }}</router-link>
      </li>
      <!-- <li>
        <span v-if="$route.path === '/'">Home</span>
        <router-link v-else to="/">Home</router-link>
      </li>
      <li>
        <span v-if="$route.path === '/projects'">Projects</span>
        <router-link v-else to="/projects">Projects</router-link>
      </li>
      <li>
        <span v-if="$route.path === '/tasks'">Tasks</span>
        <router-link v-else to="/tasks">Tasks</router-link>
      </li>
      <li>
        <span v-if="$route.path === '/persons'">Persons</span>
        <router-link v-else to="/persons">Persons</router-link>
      </li> -->
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
  },
  // data () {
  //   return {
  //     links: [
  //       { path: '/', label: 'Home' },
  //       { path: '/projects', label: 'Projects' },
  //       { path: '/tasks', label: 'Tasks' },
  //       { path: '/persons', label: 'Persons' }
  //     ]
  //   }
  // }
}

</script>

<style lang="stylus">
@import '../styles/variables.styl'

nav
  background: $primary
  height: 50px
  display: flex
  align-items: center
ul
  margin: 0
  list-style-type: none
  display: flex
  justify-content: space-between
  flex-grow: 1
  padding: 0 1rem
a
  color: $secondary
  text-decoration: none
  cursor: pointer
  display: block
  transition: transform .5s ease
a:hover
  transform: scale(1.2)
li span
  color: $tertiary




</style>