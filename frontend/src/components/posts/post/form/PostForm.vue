<template>
  <validation-observer v-slot="{ handleSubmit }">
    <b-form novalidate @submit.prevent="handleSubmit(onSubmit)">
      <validation-provider
        tag="div"
        rules="required|max:150|min:10"
        name="Title"
        v-slot="{ errors }"
      >
        <b-form-group
          label="Title"
          label-for="field-title"
        >
          <b-form-input
            id="field-title"
            v-model="form.title"
            :state="errors.length === 0"
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <validation-provider
        tag="div"
        rules="required|min:10|max:255"
        name="Preview text"
        v-slot="{ errors }"
      >
        <b-form-group
          label="Preview text"
          label-for="field-preview"
        >
          <b-form-textarea
            id="field-preview"
            v-model="form.preview_text"
            :state="errors.length === 0"
          />
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <validation-provider
        tag="div"
        rules="required|min:10"
        name="Description"
        v-slot="{ errors }"
      >
        <b-form-group
          label="Description"
          label-for="field-desc"
        >
          <b-form-textarea
            id="field-desc"
            v-model="form.description"
            :state="errors.length === 0"
          />
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <b-alert variant="danger" :show="!!error">
        {{ error }}
      </b-alert>

      <b-card class="mt-3 text-right">
        <b-button :disabled="loader" type="submit" variant="primary">
          {{ buttonText }}
        </b-button>
      </b-card>
    </b-form>
  </validation-observer>
</template>

<script>
import { extend } from 'vee-validate'
import { required, max, min } from 'vee-validate/dist/rules'

extend('required', required)
extend('max', max)
extend('min', min)

export default {
  name: 'PostForm',
  props: {
    defaultParams: {
      type: Object,
      default: () => ({})
    },
    buttonText: {
      type: String,
      default: 'Create'
    },
    loader: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    }
  },
  data: () => ({
    form: {
      title: '',
      description: '',
      preview_text: '',
      file: null,
      image: ''
    }
  }),
  mounted() {
    this.form = { ...this.form, ...this.defaultParams }
  },
  methods: {
    onSubmit() {
      if (!this.loader) {
        this.$emit('submit', {
          title: this.form.title,
          preview_text: this.form.preview_text,
          description: this.form.description
        })
      }
    }
  }
}
</script>
