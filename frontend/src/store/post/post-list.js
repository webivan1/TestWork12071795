import http from '@/services/http'

export default {
  state: {
    loader: false,
    error: undefined,
    search: {
      id: '',
      title: ''
    },
    sort: 'created_at',
    sortDirection: 'desc',
    models: [],
    currentPage: 1,
    perPage: 5,
    total: 0,
  },
  mutations: {
    setTotal(state, total) {
      state.total = total
    },

    setCurrentPage(state, page) {
      state.currentPage = page
    },

    setPerPage(state, perPage) {
      state.perPage = perPage
    },

    setModels(state, value) {
      state.models = [...value]
    },

    setSort(state, sort) {
      state.sort = sort
      state.sortDirection = 'asc'
    },

    setSortDirection(state) {
      state.sortDirection = state.sortDirection === 'desc' ? 'asc' : 'desc'
    },

    setSearch(state, params) {
      state.search = { ...state.search, ...params }
    },

    startFetching(state) {
      state.loader = true
      state.error = undefined
    },

    stopFetching(state) {
      state.loader = false
    },

    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchModels({ state, commit }) {
      if (state.loader) {
        return;
      }

      const queryParams = new URLSearchParams({
        ...state.search,
        sort: state.sort,
        sort_direction: state.sortDirection,
        page: state.currentPage
      }).toString()

      try {
        commit('startFetching')
        const {data: {
          current_page, data, per_page, total
        }} = await http.get(`/post?${queryParams}`)
        commit('setCurrentPage', current_page)
        commit('setModels', data)
        commit('setPerPage', per_page)
        commit('setTotal', total)
      } catch (e) {
        commit('setError', e.message)
      } finally {
        commit('stopFetching')
      }
    },

    async selectSort({ state, commit, dispatch }, column) {
      if (state.sort === column) {
        commit('setSortDirection')
      } else {
        commit('setSort', column)
      }

      // reset pagination
      commit('setCurrentPage', 1);

      await dispatch('fetchModels')
    },

    async search({ commit, dispatch }, params) {
      commit('setSearch', params)
      await dispatch('fetchModels')
    },

    async paginate({ state, commit, dispatch }, page) {
      if (+state.currentPage === +page) {
        return;
      }

      commit('setCurrentPage', page)

      await dispatch('fetchModels')
    },

    async remove({ commit }, id) {
      try {
        commit('startFetching')
        const { data: { status } } = await http.delete(`/post/${id}`)
        if (status !== 'success') {
          throw new Error(`Error delete the post #${id}`)
        }
      } catch (e) {
        commit('setError', e.message)
      } finally {
        commit('stopFetching')
      }
    }
  }
}
