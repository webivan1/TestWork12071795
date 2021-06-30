<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="h3 mb-4">My own posts</h1>
      <b-button to="/post/create" variant="primary">
        Add post
      </b-button>
    </div>

    <post-form-search />

    <div class="py-2 d-flex justify-content-between align-items-center">
      <div>
        Total: {{ total }}
      </div>
      <div>
        <b-icon
          icon="arrow-clockwise"
          :animation="loader ? 'spin' : ''"
          font-scale="2"
          variant="primary"
          class="clicked"
          :disabled="loader"
          @click="fetch"
        />
      </div>
    </div>

    <b-alert :show="!!error" variant="danger">
      {{ error }}
    </b-alert>

    <post-grid />

    <div class="d-flex justify-content-end mt-3">
      <b-pagination
        @input="setPage"
        :value="currentPage"
        :total-rows="total"
        :per-page="perPage"
        :disabled="loader"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PostGrid from "@/components/posts/posts-list/grid/PostGrid";
import PostFormSearch from "@/components/posts/posts-list/form-search/PostFormSearch";

export default {
  name: 'PostList',
  components: {PostFormSearch, PostGrid},
  computed: {
    ...mapState('posts', {
      loader: 'loader',
      models: 'models',
      currentPage: 'currentPage',
      perPage: 'perPage',
      total: 'total',
      error: 'error'
    })
  },
  async mounted() {
    await this.fetch()
  },
  methods: {
    async fetch() {
      await this.$store.dispatch('posts/fetchModels')
    },

    setPage(newPage) {
      this.$store.dispatch('posts/paginate', newPage)
    }
  }
}
</script>

<style scoped>
  .clicked {
    cursor: pointer;
  }
</style>
