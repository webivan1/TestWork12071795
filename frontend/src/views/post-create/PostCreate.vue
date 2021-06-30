<template>
  <access-denied>
    <h1 class="h3 mb-3">Create a new post</h1>
    <post-form
      button-text="Create"
      :loader="loaderForm"
      :error="errorForm"
      @submit="onSubmit"
    />
  </access-denied>
</template>

<script>
import { mapState } from 'vuex'
import PostForm from '@/components/posts/post/form/PostForm'

export default {
  name: 'PostCreate',
  components: {PostForm},
  created() {
    this.$store.commit('postForm/clearForm');
  },
  computed: {
    ...mapState('postForm', {
      post: 'post',
      loaderForm: 'loader',
      errorForm: 'error'
    })
  },
  methods: {
    async onSubmit(form) {
      await this.$store.dispatch('postForm/create', form)

      this.$nextTick(() => {
        if (this.post) {
          this.$store.commit('postView/setData', { ...this.post })
          this.$router.push(`/post/${this.post.id}/preview`)
          this.$store.commit('postForm/clearForm', { ...this.post })
        }
      })
    }
  }
}
</script>
