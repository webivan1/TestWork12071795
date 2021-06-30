<template>
  <div>
    <b-card class="mb-4 text-right">
      <b-button :to="'/post/' + data.id + '/edit'" class="mr-2" variant="info">
        Edit
      </b-button>
      <b-button variant="danger" @click="onDelete">
        Delete
      </b-button>
    </b-card>

    <h1 class="h3 mb-4">{{ data.title }}</h1>

    <div class="clearfix">
      <img v-if="data.image" :src="data.image" class="mr-2 mb-2 float-left" />
      <div v-html="data.description" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostViewDetail',
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  methods: {
    async onDelete() {
      if (confirm('Are you sure?')) {
        await this.$store.dispatch('posts/remove', this.data.id)
        this.$store.commit('postView/setData', undefined)
        this.$router.push({ name: 'posts' })
      }
    }
  }
}
</script>
