<template>
  <access-denied>
    <b-spinner v-show="loader" variant="primary" label="Spinning" />
    <b-alert variant="danger" :show="!!error">
      {{ error }}
    </b-alert>
    <post-view-detail v-if="data" :data="data" />
  </access-denied>
</template>

<script>
import { mapState } from 'vuex'
import PostViewDetail from '@/components/posts/post/preview/PostViewDetail'

export default {
  name: 'PostView',
  components: { PostViewDetail },
  async mounted() {
    await this.$store.dispatch('postView/fetchPost', this.$route.params.id)
  },
  computed: {
    ...mapState('postView', {
      loader: 'loader',
      data: 'data',
      error: 'error'
    })
  }
}
</script>
