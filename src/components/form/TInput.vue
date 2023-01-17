<template>
  <div class="form-control">
    <label :for="control">{{ settings.label }}</label>
    <input
      :id="control"
      :autofocus="settings.autofocus || false"
      :autocomplete="settings.autocomplete || 'off'"
      :value="value"
      :class="{'is-invalid': error }"
      ref="myInput"
      @input="onInput"
      @change="onChanged"
      @focus="onFocus"
      @blur="onBlur"
    />
    <transition name="slide-right">
      <div v-if="error" class="error-message">{{ errorMessage }}</div>
    </transition>
  </div>
</template>

<script>

export default {

  name: 'TInput',
  props: {
    control: String,
    settings: Object,
    error: Boolean,
    errorMessage: String
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
  },
  methods: {
    onInput (e) {
      this.value = e.target.value
    },
    onChanged () {
      this.$emit('changed', { control: this.control, value: this.value })
    },
    onFocus () {
      this.$emit('focused', this.control)
    },
    onBlur () {
      this.$emit('blured', this.control)
    }
  }

}

</script>

<style lang="stylus" scoped>
.form-control
  display: flex
  flex-direction: column
  padding: 1rem
  position: relative
  & label
    text-align: left
    font-size: 1.2rem
    margin-bottom: .4rem
  & input
    margin-bottom: 2rem
    border-style: none
    // border: 1px solid #cdcdcd
    outline: 1px solid #cdcdcd
    background: #efefef
    border-radius: 10px
    padding: .4em .8em
    font-size: 1.2rem
    transition: all .3s linear
    &.is-invalid
      background: lighten(red, 90%)
    &:focus
      // outline: none
      outline: 2px solid #FF70AE
      // border: 2px solid #FF70AE
      background: #efefef
      border-radius: 10px
.error-message
  color: red
  text-align: left
  position: absolute
  top: calc(100% - 2.8rem)

.slide-right-enter-from, .slide-right-leave-to
  transform: translateX(-1rem)
  opacity: 0

.slide-right-enter-to, .slide-right-leave-from
  transform: translateX(0)
  opacity: 1

.slide-right-enter-active, .slide-right-leave-active
  transition: all .3s ease
  transform-origin: left



</style>