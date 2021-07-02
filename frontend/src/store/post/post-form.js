import http from '@/services/http'

export default {
  state: {
    loader: false,
    error: undefined,
    post: undefined
  },
  mutations: {
    clearForm(state) {
      state.loader = false
      state.error = undefined
      state.post = undefined
    },

    setPost(state, post) {
      state.post = { ...post }
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
    async create({ commit }, form) {
      try {
        commit('startFetching')
        const { data: { status, post, error } } = await http.post(`/post`, form)
        if (status === 'success' && post) {
          commit('setPost', post)
        } else if (error) {
          commit('setError', error)
        }
      } catch (e) {
        commit('setError', e.message)
      } finally {
        commit('stopFetching')
      }
    },

    async update({ commit }, { id, form }) {
      try {
        commit('startFetching')
        const { data: { status, post, error } } = await http.put(`/post/${id}`, form)
        if (status === 'success' && post) {
          commit('setPost', post)
        } else if (error) {
          commit('setError', error)
        }
      } catch (e) {
        commit('setError', e.message)
      } finally {
        commit('stopFetching')
      }
    }
  }
}
