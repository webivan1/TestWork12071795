<template>
  <access-denied>
    <h1 class="h3 mb-3">Edit the post #{{ data ? data.id : '...' }}</h1>
    <b-spinner v-show="loader" variant="primary" label="Spinning" />
    <b-alert variant="danger" :show="!!error">
      {{ error }}
    </b-alert>
    <post-form
      v-if="data"
      :key="data.id"
      :default-params="data"
      button-text="Update"
      :loader="loaderForm"
      :error="errorForm"
      @submit="onSubmit"
    />
  </access-denied>
</template>

<script>
import { mapState } from 'vuex'
import PostForm from "@/components/posts/post/form/PostForm";

export default {
  name: 'PostEdit',
  components: {PostForm},
  created() {
    this.$store.commit('postForm/clearForm');
  },
  async mounted() {
    await this.$store.dispatch('postView/fetchPost', this.$route.params.id)
  },
  computed: {
    ...mapState('postView', {
      loader: 'loader',
      data: 'data',
      error: 'error'
    }),
    ...mapState('postForm', {
      post: 'post',
      loaderForm: 'loader',
      errorForm: 'error'
    })
  },
  methods: {
    async onSubmit(form) {
      await this.$store.dispatch('postForm/update', { form, id: this.data.id })

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
