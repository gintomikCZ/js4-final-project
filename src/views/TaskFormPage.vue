<template>
  <h1>{{ title }}</h1>
</template>

<script>

export default {
  name: 'TaskFormPage',
  computed: {
    mode () {
      return this.$route.params.id ? 'edit' : 'add'
    },
    title () {
      return this.mode === 'add' ? 'Add task' : 'Edit task'
    }
  }
}

</script>