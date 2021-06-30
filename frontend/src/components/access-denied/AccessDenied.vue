<template>
  <div>
    <b-alert v-if="isGuest" show>
      Access denied, you should be
      <a href="#" class="alert-link" @click.prevent="toLogin">
        logged in
      </a>
    </b-alert>
    <slot v-else :user="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AccessDenied',
  computed: {
    ...mapState('user', {
      isGuest: 'isGuest',
      user: 'data'
    })
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: 'login',
        query: {
          redirectFrom: this.$route.fullPath
        }
      })
    }
  }
}
</script>
