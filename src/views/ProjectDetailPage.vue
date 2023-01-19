<template>
  <div>
    <t-loading v-if="loading" />
    <template v-else>
      <h1>{{ project.project }}</h1>
    </template>
  </div>

</template>

<script>

import db from '../helpers/db.js'
import TLoading from '../components/TLoading.vue'

export default {
  name: 'ProjectDetailPage',
  data () {
    return {
      project: null,
      loading: true
    }
  },
  computed: {
    projectid () {
      return this.$route.params.id
    }
  },
  created () {
    db.get('js4projects/' + this.projectid).then((record) => {
      this.project = record
      this.loading = false
    })
    db.get('js4tasks?projectid=' + this.projectid).then((tasks) => {
      console.log(tasks)
    })
    //   this.project = data.find(record => {
    //     return record.id === this.$route.params.id
    //   })
    // })
  },
  components: { TLoading }

}

</script>