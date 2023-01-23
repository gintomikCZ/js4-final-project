<template>
  <t-page
    :title="project ? project.project : ''"
    :loading="loading"
  >
    <template v-slot:content>
      <div>
        <t-list :items="tasksToDisplay" display-icons />
      </div>
    </template>
  </t-page>


</template>

<script>

import db from '../helpers/db.js'
import { formatDate, isPast } from '../helpers/dateFunctions.js'
import TPage from '../components/TPage.vue'
import TList from '../components/TList.vue'
// import TButton from '../components/TButton.vue'

export default {
  name: 'ProjectDetailPage',
  data () {
    return {
      project: null,
      loading: true,
      tasks: null
    }
  },
  computed: {
    projectid () {
      return this.$route.params.id
    },
    tasksToDisplay () {
      return this.tasks.map(task => {
        let icon = ''
        let color = ''
        const buttons = ['edit', task.completed ? 'mark undone' : 'mark done']
        if (task.completed) {
          icon = 'check',
          color = 'green'
        } else if (isPast(task.date)) {
          icon = 'warning',
          color = 'red'
        }
        return {
          id: task.id,
          header: task.task,
          subtitle: formatDate(task.date),
          icon: { icon, color },
          buttons
        }
      })
    }
  },
  created () {
    const promises = [
      db.get('js4projects/' + this.projectid).then((record) => {
        this.project = record
      }),
      db.get('js4tasks?projectid=' + this.projectid).then((tasks) => {
        this.tasks = tasks
      })
    ]
    Promise.all(promises).then(() => {
      this.loading = false
    })
  },
  components: { TPage, TList }

}

</script>

<style lang="stylus" scoped>
</style>