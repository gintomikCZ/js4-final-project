<template>
  <t-page
    :loading="loading"
    :title="task ? task.task : ''"
  >
    <template v-slot:content>
      <div class="top-buttons">
        <t-button label="edit" @clicked="onEditButtonClicked" />
        <t-button v-if="!persons.length" label="delete" @clicked="onDeleteButtonClicked" />
        <t-button label="add person" @clicked="onAddPersonClicked" />
      </div>
      <div>
        <t-list
          :items="personsToDisplay"
          @clicked="onItemButtonClicked"
        />
      </div>
    </template>
  </t-page>
  <t-modal
    :show="showDeleteModal"
    title="confirm delete"
    ok-button-label="delete"
    @close-me="closeDeleteModal"
    @ok-clicked="deleteTask"
    @cancel-clicked="closeDeleteModal">
    <div>
      <span>do you really want to delete </span>
      <strong>{{ person.last + ' ' + person.first }}</strong>
      <span> ?</span>
    </div>
  </t-modal>
  <t-modal
    :show="showAddPersonModal"
    title="add person"
    ok-button-label="submit"
    @close-me="closeAddPersonModal"
    @cancel-clicked="closeAddPersonModal"
    @ok-clicked="addPerson"
  >
    <div>
      <t-input
        control="addPerson"
        :settings="addPersonSettings"
        @changed="onAddPersonChanged"
      />
    </div>
  </t-modal>
</template>

<script>

import db from '../helpers/db.js'
import TPage from '../components/TPage.vue'
import TButton from '../components/TButton.vue'
import TModal from '../components/TModal.vue'
import TList from '../components/TList.vue'
import TInput from '../components/form/TInput.vue'

export default {

  name: 'TaskDetailPage',
  data () {
    return {
      task: null, // Object
      persons: null, // Array
      loading: true,
      showDeleteModal: false,
      showAddPersonModal: false,
      addPersonSettings: {
        type: 'select',
        options: [
  //        { value: ..., label: ...}
        ]
      },
      personToAdd: null
    }
  },
  computed: {
    taskid () {
      return this.$route.params.id
    },
    personsToDisplay () {
      return this.persons.map(person => {
        return {
          id: person.personid,
          header: person.last + ' ' + person.first,
          subtitle: person.position,
          icon: { icon: '', color: ''},
          buttons: ['remove', 'edit']
        }
      })
    }
  },
  created () {
    Promise.all([
      db.get('js4tasks/' + this.taskid).then(task => {
        this.task = task
      }),
      this.fetchPersons()
    ]).then(() => {
      this.loading = false
    })
  },
  methods: {
    fetchPersons () {
      return db.get('js4personstasks?taskid=' + this.taskid).then(persons => {
        this.persons = persons
      })
    },
    onEditButtonClicked () {
      this.$router.push('/task-form/' + this.taskid)
    },
    onDeleteButtonClicked () {
      this.showDeleteModal = true
    },
    closeDeleteModal () {
      this.showDeleteModal = false
    },
    deleteTask () {
      db.delete('js4tasks', { id: this.taskid }).then(() => {
        this.closeDeleteModal()
        this.$router.push('/tasks')
      })
    },
    onItemButtonClicked (payload) {
      if (payload.button === 'edit') {
        this.$router.push('/person-form/' + payload.item.id)
        return
      }
      if (payload.button === 'remove') {
        const obj = this.persons.find((item) => {
          return ('' + item.taskid === '' + this.taskid) && ('' + item.personid === '' + payload.item.id)
        })
        db.delete('js4personstasks', { id: obj.id }).then(() => {
          this.fetchPersons()
        })
      }
    },
    onAddPersonClicked () {
      db.get('js4persons').then(persons => {
        const personids = this.persons.map(person => person.personid)
        this.addPersonSettings.options = persons.filter(person => personids.indexOf(person.id) < 0)
          .map(person => { return { value: person.id, label: person.last + ' ' + person.first } })
        this.addPersonSettings.options.unshift({ value: '', label: '' })
      }).then(() => {
        this.personToAdd = null
        this.showAddPersonModal = true
      })
    },
    closeAddPersonModal () {
      this.showAddPersonModal = false
    },
    addPerson () {
      db.post('js4personstasks', { taskid: this.taskid, personid: this.personToAdd }).then(() => {
        this.fetchPersons().then(() => {
          this.closeAddPersonModal()
        })
      })
    },
    onAddPersonChanged (payload) {
      this.personToAdd = payload.value
    }
  },
  components: { TPage, TButton, TModal, TList, TInput }
}

</script>
<style lang="stylus" scoped>
@import '../styles/variables.styl'
.top-buttons
  display: flex
  gap: 1rem
  justify-content: center
  margin-bottom: $margin
</style>