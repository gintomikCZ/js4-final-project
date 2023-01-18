<template>
  <div>
    <h1>tasks</h1>
    <t-modal
      :show="showDeleteModal"
      title="confirm delete"
      ok-button-label="delete"
      cancel-button-label="cancel"
      @close-me="closeDeleteModal"
      @ok-clicked="deleteTask"
      @cancel-clicked="closeDeleteModal"
    >
      <div>
        <span>Do you really want to delete task </span>
        <strong>{{ taskToDelete.task }}</strong>
        <span> ?</span>
      </div>
    </t-modal>
    <div class="page-large-btn-container">
      <t-button label="add task" @clicked="$router.push('/task-form')" />
    </div>

    <div v-if="!loading">
      <t-accordeon v-for="task in tasksToDisplay" :key="task.id"
        :title="task.task + ' (' + task.project + ')'">
        <template v-slot:content>
          <div class="task-info-row">
            <div class="task-icon">
              <t-icon :icon="task.icon"/>
            </div>
            <div class="page-btn-container tasks-btn-container">
              <t-button label="detail" small-size @clicked="$router.push('/task/' + task.id)" />
              <t-button label="edit" small-size @clicked="$router.push('/task-form/' + task.id)" />
              <t-button v-if="!task.persons.length" label="delete" small-size @clicked="onDeleteClicked(task)" />
            </div>
          </div>
          <t-list :items="task.persons" />
        </template>
      </t-accordeon>
    </div>
    <t-loading v-else />
  </div>
</template>

<script>

import db from '../helpers/db.js'
import { isPast } from '../helpers/dateFunctions.js'
import TAccordeon from '../components/TAccordeon.vue'
import TButton from '../components/TButton.vue'
import TList from '../components/TList.vue'
import TLoading from '../components/TLoading.vue'
import TIcon from '../components/TIcon.vue'
import TModal from '../components/TModal.vue'

export default {
  name: 'TasksPage',
  data () {
    return {
      loading: true,
      tasks: [],
      /* { id: 1, task: '....', completed: 0, priority: 1, date: '2022-12-29', project: 'zahrada' }
        přiřadíme k němu ikonu:
        icon: { icon: '', color: '' }
        persons: [
          { fullName: 'karel Houska', position: 'manager' }
        ]
      */
      persons: [],
      showDeleteModal: false,
      taskToDelete: {}
    }
  },
  computed: {
    tasksToDisplay () {
      return this.tasks.map(task => {
        let icon = ''
        let color = ''
        if (task.completed) {
          icon = 'check'
          color= 'green'
        } else if (isPast(task.date)) {
          icon = 'warning'
          color = 'red'
        }
        const persons = this.persons.filter(person => task.id === person.taskid).map(person => {
          return {
            id: person.id,
            header: person.last + ' ' + person.first,
            subtitle: person.position
          }
        })
        return Object.assign(task, { icon: { icon, color } }, { persons })
      })
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const promises = [
        db.get('js4tasks').then(tasks => { this.tasks = tasks }),
        db.get('js4personstasks').then(persons => { this.persons = persons })
      ]
      Promise.all(promises).then(() => { this.loading = false })
    },
    onDeleteClicked (task) {
      this.taskToDelete = task
      this.showDeleteModal = true
    },
    closeDeleteModal () {
      this.taskToDelete = {}
      this.showDeleteModal = false
    },
    deleteTask () {
      db.delete('js4tasks', { id: this.taskToDelete.id }).then(() => {
        this.taskToDelete = {}
        this.showDeleteModal = false
        this.fetchData()
      })
    }
  },
  components: { TAccordeon, TButton, TList, TLoading, TIcon, TModal }
}

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
.task-info-row
  display: flex
  justify-content: space-between
  align-items: center
  border-bottom: 1px solid #efefef
.task-icon
  padding: $list-items-padding

.page-btn-container.tasks-btn-container
  border-bottom: none

</style>