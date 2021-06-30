<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="heading of headings" :key="heading.column">
          <sort
            :disabled="loader"
            :column="heading.column"
            :active="sort"
            :active-order="sortDirection"
            @sort="setSort"
          >
            {{ heading.label }}
          </sort>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="model of models" :key="model.id">
        <td>{{ model.id }}</td>
        <td>{{ model.title }}</td>
        <td>{{ model.created_at }}</td>
        <td>{{ model.updated_at }}</td>
        <td class="d-flex">
          <router-link :to="'/post/' + model.id + '/preview'" class="mr-1">
            <b-icon-eye />
          </router-link>
          <router-link :to="'/post/' + model.id + '/edit'" class="mr-1">
            <b-icon-pencil />
          </router-link>
          <a href="#" @click.prevent="onDelete(model.id)">
            <b-icon-trash />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {mapState} from "vuex";
import Sort from "@/components/sort/Sort";

export default {
  name: 'PostGrid',
  components: {Sort},
  data: () => ({
    headings: [
      { label: 'ID', column: 'id' },
      { label: 'Title', column: 'title' },
      { label: 'Created', column: 'created_at' },
      { label: 'Updated', column: 'updated_at' },
    ]
  }),
  computed: {
    ...mapState('posts', {
      models: 'models',
      sort: 'sort',
      sortDirection: 'sortDirection',
      loader: 'loader'
    })
  },
  methods: {
    async setSort(column) {
      await this.$store.dispatch('posts/selectSort', column)
    },

    async onDelete(id) {
      if (confirm('Are you sure?')) {
        await this.$store.dispatch('posts/remove', id)
        // update list
        await this.$store.dispatch('posts/fetchModels')
      }
    }
  }
}
</script>
