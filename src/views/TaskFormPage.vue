<template>
  <div>
    <h1>{{ title }}</h1>
    <t-form :settings="settings" v-if="!loading" @submited="onSubmited" />
    <t-loading v-else />
  </div>
</template>

<script>
import TForm from '../components/form/TForm.vue'
import TLoading from '../components/TLoading.vue'
import db from '../helpers/db.js'

export default {
  name: 'TaskFormPage',
  data () {
    return {
      loading: true,
      settings: {
        task: {
          label: 'task',
          valRules: [
            { rule: 'required', message: 'the task description is required' }
          ]
        },
        projectid: {
          label: 'project',
          type: 'select',
          valRules: [
            { rule: 'required', message: 'the project is required' }
          ]
        },
        date: {
          label: 'date to complete',
          type: 'date',
          valRules: [
            { rule: 'required', message: 'the date is required' }
          ]
        },
        completed: {
          label: 'completed',
          type: 'select',
          options: [
            { value: '', label: '' },
            { value: 0, label: 'no' },
            { value: 1, label: 'yes' }
          ],
          valRules: [
            { rule: 'required', message: 'please mark the task as completed or not completed' }
          ]
        },
        priority: {
          label: 'priority',
          type: 'select',
          options: [
            { value: '', label: '' },
            { value: 1, label: 'low' },
            { value: 2, label: 'medium' },
            { value: 3, label: 'high' }
          ],
          valRules: [
            { rule: 'required', message: 'the priority is required' }
          ]
        }
      }
    }
  },
  computed: {
    mode () {
      return this.$route.params.id ? 'edit' : 'add'
    },
    title () {
      return this.mode === 'add' ? 'Add task' : 'Edit task'
    }
  },
  created () {
    if (this.mode === 'add') {
      this.loading = false
    } else {
      db.get('js4tasks/' + this.$route.params.id).then(record => {
        Object.keys(this.settings).forEach(control => {
          this.settings[control].initialValue = record[control]
        })
        this.loading = false
      })
    }
  },
  methods: {
    onSubmited (data) {
      const promise = this.mode === 'add'
        ? db.post('js4tasks', data)
        : db.put('js4tasks', Object.assign({ id: this.$route.params.id }, data))
      promise.then(() => {
        this.$router.push('/tasks')
      })
    }
  },
  components: { TLoading, TForm }
}

</script>