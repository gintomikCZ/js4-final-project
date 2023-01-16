<template>
  <form>
    <template v-for="control in controls" :key="control">

      <!-- <div>
        <label :for="control">{{ settings[control].label }}</label>
        <input :id="control" />
      </div> -->
      <t-input
        :control="control"
        :settings="settings[control]"
      />

    </template>
  </form>
</template>

<script>

import TInput from './TInput.vue'

export default {
  name: 'TForm',
  props: {
    settings: Object
  },
  computed: {
    controls () {
      return Object.keys(this.settings) // ['project']
    }
  },
  components: { TInput }


}

</script>

<style lang="stylus" scoped>

form
  width: 60%
  max-width: 400px
  margin: 0 auto

</style>