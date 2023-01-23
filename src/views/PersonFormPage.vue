<template>

  <t-page
    :title="title"
    :loading="loading"
  >
    <template v-slot:content>
      <t-form :settings="settings" v-if="!loading" @submited="onSubmited" />
    </template>
  </t-page>

</template>

<script>

import db from '../helpers/db.js'
import TForm from '../components/form/TForm.vue'
import TPage from '../components/TPage.vue'
export default {
  name: 'PersonFormPage',
  data () {
    return {
      loading: true,
      settings: {
        first: {
          label: 'first name'
        },
        last: {
          label: 'last name'
        },
        positionid: {
          type: 'select',
          label: 'position',
          options: []
        }
      }
    }
  },
  computed: {
    mode () {
      return this.$route.params.id ? 'edit' : 'add'
    },
    title () {
      return this.mode === 'add' ? 'Add person' : 'Edit person'
    }
  },
  created () {
    const promises = [
      db.get('js4positions').then((positions) => {
        this.settings.positionid.options =
          [].concat(
            [{ value: '', label: '' }],
            positions.map(position => {
            return {
              value: position.id,
              label: position.position
            }
          })
        )
      })
    ]
    if (this.mode === 'edit') {
      promises.push(
        db.get('js4persons/' + this.$route.params.id).then(record => {
          Object.keys(this.settings).forEach(control => {
            this.settings[control].initialValue = record[control]
          })
        })
      )
    }
    Promise.all(promises).then(() => {
      this.loading = false
    })
  },
  methods: {
    onSubmited (data) {
      const promise = this.mode === 'add'
        ? db.post('js4persons', data)
        : db.put('js4persons', Object.assign({ id: this.$route.params.id }, data ))
      promise.then(() => {
        this.$router.push('/persons')
      })
    }
  },
  components: { TForm, TPage }
}

</script>