<template>
  <div class="form-control">
    <label :for="control">{{ settings.label }}</label>
    <input
      :id="control"
      :autofocus="settings.autofocus || false"
      :autocomplete="settings.autocomplete || 'off'"
      :value="value"
      ref="myInput"
    />
  </div>
</template>

<script>

export default {

  name: 'TInput',
  props: {
    control: String,
    settings: Object
  },
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.value = this.settings.initialValue || ''
  },
  mounted () {
    if (this.settings.autofocus) {
      this.$refs.myInput.focus()
    }
  }

}

</script>

<style lang="stylus" scoped>
.form-control
  display: flex
  flex-direction: column
  // align-items: flex-start
  & label
    text-align: left
  & input
    margin-bottom: 1.5rem
    border-style: none
    border-bottom: 1px solid #cdcdcd
    padding: .4em .8em
    font-size: 1.2rem
    background: #efefef
    &:focus
      outline: none
      background: lightblue

</style>