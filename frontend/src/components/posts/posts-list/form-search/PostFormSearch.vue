<template>
  <validation-observer v-slot="{ handleSubmit }">
    <b-form class="mb-3" novalidate @submit.prevent="handleSubmit(onSubmit)" @reset="onReset">
      <b-row class="align-items-end">
        <b-col>
          <validation-provider
            tag="div"
            rules="numeric"
            name="Id"
            v-slot="{ errors }"
          >
            <b-form-group
              label="Id"
              label-for="field-id"
              class="mb-0"
            >
              <b-form-input
                id="field-id"
                v-model="id"
                :state="errors.length === 0"
              ></b-form-input>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <validation-provider
            tag="div"
            rules="max:150"
            name="Title"
            v-slot="{ errors }"
          >
            <b-form-group
              label="Title"
              label-for="field-title"
              class="mb-0"
            >
              <b-form-input
                id="field-title"
                v-model="title"
                :state="errors.length === 0"
              ></b-form-input>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col sm="auto">
          <b-button-group>
            <b-button type="reset" variant="danger">
              <b-icon-arrow-clockwise />
            </b-button>
            <b-button type="submit" variant="primary">
              <b-icon-search />
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapState } from 'vuex'
import { extend } from 'vee-validate'
import { max, min, numeric } from 'vee-validate/dist/rules'

extend('numeric', numeric)
extend('max', max)
extend('min', min)

export default {
  name: 'PostFormSearch',
  methods: {
    async onSubmit() {
      await this.$store.dispatch('posts/fetchModels')
    },

    onReset() {
      this.id = ''
      this.title = ''
      this.onSubmit()
    }
  },
  computed: {
    ...mapState('posts', {
      search: 'search'
    }),
    id: {
      get() {
        return this.search.id ?? ''
      },
      set(value) {
        this.$store.commit('posts/setSearch', {
          ...this.search,
          id: value
        })
      }
    },
    title: {
      get() {
        return this.search.title ?? ''
      },
      set(value) {
        this.$store.commit('posts/setSearch', {
          ...this.search,
          title: value
        })
      }
    },
  }
}
</script>
