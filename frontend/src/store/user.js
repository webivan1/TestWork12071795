import http from '@/services/http'

const tokenName = process.env.VUE_APP_TOKEN_NAME ?? 'token'

export default {
  state: {
    isGuest: true,
    loader: false,
    error: undefined,
    data: undefined,
  },
  mutations: {
    setUser(state, user) {
      state.isGuest = false
      state.data = { ...user }
    },

    clearUser(state) {
      state.isGuest = true
      state.data = undefined
      localStorage.removeItem(tokenName)
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
    async login({ commit, dispatch }, { email, password }) {
      try {
        commit('startFetching')
        const { data: { status, message, token } } = await http().post('/login', { email, password })

        console.log(status, message, token)

        if (status === 'success' && token) {
          localStorage.setItem(tokenName, token)
          await dispatch('autoLoginByToken')
        } else if (message) {
          commit('setError', message)
        }
      } catch (e) {
        commit('setError', e.message)
      } finally {
        commit('stopFetching')
      }
    },

    logout({ commit }) {
      commit('clearUser')
    },

    async autoLoginByToken({ state, commit }) {
      const token = localStorage.getItem(tokenName);

      if (!token) {
        return commit('clearUser')
      }

      try {
        commit('startFetching')
        const { data } = await http().get('/user')
        commit('setUser', data)
      } catch (e) {
        commit('setError', e.message)
        if (!state.isGuest) {
          commit('clearUser')
        }
      } finally {
        commit('stopFetching')
      }
    }
  }
}
