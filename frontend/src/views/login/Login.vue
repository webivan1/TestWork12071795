<template>
  <div class="d-flex justify-content-center align-items-center">
    <b-card no-body class="shadow-sm wrapper">
      <b-card-header class="text-center">
        <b>Login form</b>
      </b-card-header>
      <b-card-body>
        <login-form />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoginForm from '@/components/login-form/LoginForm'

export default {
  components: {LoginForm},
  watch: {
    isGuest(currentValue) {
      if (!currentValue) {
        this.redirect()
      }
    }
  },
  computed: {
    ...mapState('user', {
      isGuest: 'isGuest'
    })
  },
  created() {
    if (!this.isGuest) {
      this.redirect()
    }
  },
  methods: {
    redirect() {
      this.$router.push(this.$route.query.redirectFrom ?? '/posts')
    }
  }
}
</script>

<style scoped>
  .wrapper {
    max-width: 350px;
    width: 100%;
  }
</style>
