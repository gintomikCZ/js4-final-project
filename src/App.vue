<template>
  <t-nav-bar :links="navbarLinks" />
  <router-view/>
</template>

<script>
import TNavBar from './components/TNavBar.vue'
export default {
  name: 'App',
  data () {
    return {
      navbarLinks: [
        { path: '/', label: 'Home' },
        { path: '/projects', label: 'Projects' },
        { path: '/tasks', label: 'Tasks' },
        { path: '/persons', label: 'Persons' }
      ]
    }
  },
  components: { TNavBar }
}

</script>


<style lang="stylus">
body, html
  margin: 0
  padding: 0
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  text-align center
  color #2c3e50
</style>
