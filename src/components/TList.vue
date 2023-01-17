<template>
  <ul>
    <!-- items zobrazit v cyklu (tasks, persons, tasks .....) -->
    <li v-for="item in items" :key="item.id">
      <div class="icon" v-if="displayIcons">
        <t-icon
          v-if="item.icon"
          :icon="item.icon"
        />
      </div>
      <div class="content">
        <div class="header">{{  item.header }}</div>
        <div class="subtitle">{{ item.subtitle }}</div>
      </div>
    </li>
  </ul>
</template>
<script>
import TIcon from './TIcon.vue'

export default {
  name: 'TList',
  props: {
    items: Array, // { id: 23, header: 'tzsdutuf', subtitle: 'sdhjkfhsdk', icon: { icon: 'check', color: 'green' }}
    displayIcons: {
      type: Boolean,
      default: false
    }
  },
  components: { TIcon }
}

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'

ul
  list-style-type: none
  margin: 0
  padding: 0
li
  padding: $list-items-padding
  text-align: left
  display: flex
  justify-content: flex-start
.header
  font-weight: bold
.subtitle
  font-size: .8rem
.icon
  width: 1rem
  display: flex
  justify-content: center
  align-items: center
  margin-right: 1rem
</style>