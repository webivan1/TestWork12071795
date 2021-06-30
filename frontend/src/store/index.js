import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'
import posts from '@/store/post/post-list'
import postView from '@/store/post/post-view'
import postForm from '@/store/post/post-form'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      ...user
    },
    posts: {
      namespaced: true,
      ...posts
    },
    postView: {
      namespaced: true,
      ...postView
    },
    postForm: {
      namespaced: true,
      ...postForm
    }
  }
})
