<template>
  <h1>{{ title }}</h1>
</template>

<script>

export default {
  name: 'ProjectFormPage',
  computed: {
    mode () {
      return this.$route.params.id ? 'edit' : 'add'
    },
    title () {
      return this.mode === 'add' ? 'Add project' : 'Edit project'
    }
  }
}

</script>