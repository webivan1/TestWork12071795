import http from '@/services/http'

export default {
  state: {
    loader: false,
    error: undefined,
    data: undefined
  },
  mutations: {
    setData(state, value) {
      state.data = { ...value }
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
    async fetchPost({ state, commit }, id) {
      if (state.loader) {
        return;
      }

      if (+state.data?.id === +id) {
        return;
      }

      try {
        commit('startFetching')
        commit('setError', undefined)
        const { data } = await http().get(`/post/${id}`)
        commit('setData', data)
      } catch (e) {
        commit('setError', e.message)
      } finally {
        commit('stopFetching')
      }
    }
  }
}
