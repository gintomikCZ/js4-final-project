
<template>
  <div v-if="show" class="modal-bg">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">{{ title }}</div>
        <div>
          <t-button label="X" small-size @clicked="onCloseClicked"/>
        </div>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <t-button :label="okButtonLabel" small-size @clicked="onOkClicked"/>
        <t-button :label="cancelButtonLabel" small-size @clicked="onCancelClicked"/>
      </div>
    </div>
  </div>
</template>


<script>
import TButton from './TButton.vue'
export default {
  name: 'TModal',
  props: {
    title: {
      type: String
    },
    okButtonLabel: {
      type: String,
      default: 'OK'
    },
    cancelButtonLabel: {
      type: String,
      default: 'cancel'
    },
    show: Boolean

  },
  methods: {
    onCloseClicked () {
      this.$emit('close-me')
    },
    onOkClicked () {
      this.$emit('ok-clicked')
    },
    onCancelClicked () {
      this.$emit('cancel-clicked')
    }
  },
  components: { TButton }
}

</script>

<style lang="stylus" scoped>
.modal-bg
  background: rgba(0, 0, 0, 0.5)
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  z-index: 1
.modal-content
  width: 60%
  min-width: 300px
  max-width: 700px
  min-height: 200px
  background: white
  margin: 2rem auto
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.5)
  border-radius: 10px
  display: flex
  flex-direction: column
.modal-header
  border-bottom: 1px solid #cdcdcd
  justify-content: space-between
.modal-footer
  border-top: 1px solid #cdcdcd
  justify-content: flex-end
  gap: 1rem
.modal-header, .modal-footer
  height: 50px
  display: flex
  align-items: center
  padding: 0 1rem
.modal-body
  flex-grow: 1
  padding: 1rem
  text-align: left
.modal-title
  font-size: 1.2rem
  font-weight: bold
</style>