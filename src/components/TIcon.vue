<template>
  <svg
    :fill="color"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="width + 'px'"
    :height="height + 'px'"
    :viewBox="icon.viewBox"
    xml:space="preserve">
    <g>
      <path :d="icon.path" />
    </g>
  </svg>
</template>
<script>
import { getIcon } from '@/icons/icons.js';


export default {
  name: 'IconCheck',
  props: {
    width: {
      type: Number,
      default: 16
    },
    height: {
      type: Number,
      default: 16
    },
    color: {
      type: String,
      default: '#000000'
    },
    iconName: {
      type: String,
      required: true
    }
  },
  computed: {
    icon () {
      return getIcon(this.iconName)
    }
  }
}

</script>