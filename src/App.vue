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
@import './styles/variables.styl'

body, html
  margin: 0
  padding: 0

body
  padding-bottom: 2rem

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  text-align center
  color #2c3e50

.page-btn-container
  display: flex
  justify-content: flex-end
  align-items: center
  padding: $list-items-padding
  border-bottom: 1px solid #efefef

.page-large-btn-container
  padding-bottom: 2rem
</style>
