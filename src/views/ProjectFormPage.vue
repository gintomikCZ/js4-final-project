<template>
  <div>
    <h1>{{ title }}</h1>
    <t-form :settings="settings" v-if="!loading" />
    <t-loading v-else />
  </div>

</template>

<script>
import TForm from '../components/form/TForm.vue'
import TLoading from '../components/TLoading.vue'
import db from '../helpers/db.js'
export default {
  name: 'ProjectFormPage',
  data () {
    return {
      settings: {
        project: {
          autofocus: true,
          label: 'project',
        }
      },
      loading: true
    }
  },
  computed: {
    mode () {
      return this.$route.params.id ? 'edit' : 'add'
    },
    title () {
      return this.mode === 'add' ? 'Add project' : 'Edit project'
    }
  },
  created () {
    if (this.mode === 'add') {
      this.loading = false
      return
    }
    db.get('js4projects/' + this.$route.params.id).then((record) => {
      Object.keys(this.settings).forEach(control => {
        this.settings[control].initialValue = record[control]
      })

      this.loading = false
    })
  },
  components: { TForm, TLoading }
}

</script>