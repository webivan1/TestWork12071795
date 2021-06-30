<template>
  <validation-observer v-slot="{ handleSubmit }">
    <b-form novalidate @submit.prevent="handleSubmit(onSubmit)">
      <validation-provider
        tag="div"
        rules="required|email|max:150"
        name="Email"
        v-slot="{ errors }"
      >
        <b-form-group
          label="Email address: (admin@admin.com)"
          label-for="field-email"
        >
          <b-form-input
            id="field-email"
            v-model="email"
            type="email"
            placeholder="Enter email"
            :state="errors.length === 0"
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <validation-provider
        tag="div"
        rules="required|min:6|max:50"
        name="Email"
        v-slot="{ errors }"
      >
        <b-form-group
          label="Password: (password)"
          label-for="field-password"
        >
          <b-form-input
            id="field-password"
            v-model="password"
            type="password"
            placeholder="Enter password"
            :state="errors.length === 0"
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <b-alert :show="!!error" variant="danger">
        {{ error }}
      </b-alert>

      <div class="text-center p-1">
        <b-button :disabled="loader" type="submit" variant="primary">
          Sign In
        </b-button>
      </div>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapState } from 'vuex'
import { extend } from 'vee-validate'
import { required, email, max, min } from 'vee-validate/dist/rules'

extend('required', required)
extend('email', email)
extend('max', max)
extend('min', min)

export default {
  name: 'LoginForm',
  data: () => ({
    email: 'admin@admin.com',
    password: 'password'
  }),
  computed: {
    ...mapState('user', {
      loader: 'loader',
      error: 'error'
    })
  },
  methods: {
    onSubmit() {
      if (this.loader) {
        return;
      }

      this.$store.dispatch('user/login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
