<template>
  <div>
    <b-navbar sticky toggleable="lg" variant="white" class="shadow-sm">
      <b-container class="d-flex">
        <b-navbar-brand class="mr-5" to="/">
          <b>Crud</b>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/about">About</b-nav-item>
            <b-nav-item :disabled="isGuest" to="/posts">
              Posts
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav v-if="!isGuest" class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                {{ user.name }}
              </template>
              <b-dropdown-item @click="logout" href="#">
                Sign Out
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav v-else class="ml-auto">
            <b-nav-item to="/login">Sign In</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container class="pt-5">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('user', {
      isGuest: 'isGuest',
      loader: 'loader',
      user: 'data'
    })
  },
  async created() {
    await this.$store.dispatch('user/autoLoginByToken')
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
