<template>
<div>
  <h1>persons</h1>
  <div class="page-large-btn-container">
    <t-button label="add person" @clicked="$router.push('/person-form')" />
  </div>

  <div v-if="!loading">
    <t-accordeon v-for="person in personsToDisplay" :key="person.id" :title="person.fullName">
      <template v-slot:content>
        <div class="page-btn-container tasks-btn-container">
          <t-button label="detail" small-size @clicked="$router.push('/person/' + person.id)" />
          <t-button label="edit" small-size @clicked="$router.push('/person-form/' + person.id)" />
          <t-button v-if="!person.tasks.length" label="delete" small-size @clicked="onDeleteClicked(person)" />
        </div>
        <t-list :items="person.tasks" display-icons />
      </template>
    </t-accordeon>
  </div>
  <t-loading v-else />
</div>
</template>

<script>

import db from '../helpers/db.js'
import { formatDate, isPast } from '../helpers/dateFunctions.js'
import TButton from '../components/TButton.vue'
import TAccordeon from '../components/TAccordeon.vue'
import TList from '../components/TList.vue'
import TLoading from '../components/TLoading.vue'

export default {

  name: 'PersonsPage',
  data () {
    return {
      loading: true,
      persons: [],
      tasks: []
    }
  },
  computed: {
    personsToDisplay () {
      return this.persons.map(person => {
        return {
          id: person.id,
          fullName: person.last + ' ' + person.first + ' (' + person.position + ')',
          tasks: this.tasks.filter(task => person.id === task.personid).map(task => {
            let icon = ''
            let color = ''
            if(task.completed) {
              icon = 'check'
              color = 'green'
            }
            else if (isPast(task.date)) {
              icon = 'warning'
              color = 'red'
            }
            return {
              id: task.id,
              header: task.task,
              subtitle: task.project + ', ' + formatDate(task.date),
              icon: { icon, color }
            }
          })
        }
      })
    }
  },
  created () {
    // načíst data, potom loading na false
    Promise.all([
      db.get('js4persons').then((persons) => { this.persons = persons }),
      db.get('js4personstasks').then(tasks => { this.tasks = tasks })
    ]).then(() => {
      this.loading = false
    })
  },
  components: { TButton, TList, TAccordeon, TLoading}
}

</script>