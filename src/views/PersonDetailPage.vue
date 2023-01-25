<template>
  <t-page
    :loading="loading"
    :title="person ? person.last + ' ' + person.first + ' (' + person.position + ')' : ''"
  >
    <template v-slot:content>
      <div class="top-buttons">
        <t-button label="edit" @clicked="onEditButtonClicked" />
        <t-button label="delete" @clicked="onDeleteButtonClicked" />
      </div>
    </template>
  </t-page>
  <t-modal
    :show="showDeleteModal"
    title="confirm delete"
    ok-button-label="delete"
    @close-me="closeDeleteModal"
    @ok-clicked="deletePerson"
    @cancel-clicked="closeDeleteModal"
  >
    <div>
      <span>do you really want to delete </span>
      <strong>{{ person.last + ' ' + person.first }}</strong>
      <span> ?</span>
    </div>
  </t-modal>
</template>

<script>
import db from '../helpers/db.js'
import TPage from '../components/TPage.vue'
import TButton from '../components/TButton.vue'
import TModal from '../components/TModal.vue'
export default {
  name: 'PersonDetailPage',
  data () {
    return {
      person: null,
      loading: true,
      tasks: null,
      showDeleteModal: false
    }
  },
  computed: {
    personid () {
      return this.$route.params.id
    }
  },
  created () {
    const promises = [
      db.get('js4persons/' + this.personid).then(record => {
        this.person = record
      }),
      db.get('js4personstasks?personid=' + this.personid).then((tasks) => {
        this.tasks = tasks
      })
    ]
    Promise.all(promises).then(() => {
      this.loading = false
    })
  },
  methods: {
    onEditButtonClicked () {
      this.$router.push('/person-form/' + this.personid)
    },
    onDeleteButtonClicked () {
      this.showDeleteModal = true
    },
    closeDeleteModal () {
      this.showDeleteModal = false
    },
    deletePerson () {
      db.delete('js4persons', { id: this.personid }).then(() => {
        this.closeDeleteModal()
        this.$router.push('/persons')
      })
    }
  },
  components: { TPage, TButton, TModal }
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