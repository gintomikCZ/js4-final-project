<template>
  <h1>projects</h1>
  <!-- projects -->
  <!-- <ul>
    <li v-for="project in projects" :key="project.id">{{  project.project }}</li>
  </ul> -->
  <div>
    <t-accordeon
      v-for="project in projectsToDisplay"
      :key="project.id"
      :title="project.project + ' (' + project.tasks.filter(task => task.completed).length + '/' + project.tasks.length + ')'"
    >
      <template v-slot:content>
        <div class="btn-container">
          <t-button label="detail" small-size />
          <t-button label="edit" small-size />
          <t-button label="delete" small-size />
          <t-button label="add task" small-size />
        </div>
        <t-list :items="project.tasks" display-icons />
      </template>
    </t-accordeon>
  </div>
</template>

<script>
import { getProjects, getTasks } from '../data/data.js'
import { formatDate } from '../helpers/dateFunctions.js'
import TAccordeon from '../components/TAccordeon.vue'
import TList from '../components/TList.vue'
import TButton from '../components/TButton.vue'

export default {
  name: 'ProjectsPage',
  data () {
    return {
      projects: [],
      tasks: []
    }
  },
  computed: {
    projectsToDisplay () {
      return this.projects.map(project => {
        return Object.assign(
          {
            tasks: this.tasks.filter(task => project.id === task.projectid).map(item => {
              return {
                id: item.id,
                header: item.task,
                subtitle: formatDate(item.date),
                icon: item.completed ? 'check' : '',
                completed: item.completed
              }
            })
          },
          project
        )
      })
    }
  },
  created () {
    getProjects().then((projects) => {
      this.projects = projects
    })
    getTasks().then((tasks) => {
      this.tasks = tasks
    })
  },
  components: { TAccordeon, TList, TButton }
}

</script>
<style lang="stylus" scoped>
@import '../styles/variables.styl'
.btn-container
  display: flex
  justify-content: flex-end
  align-items: center
  padding: $list-items-padding
  border-bottom: 1px solid #efefef

</style>
