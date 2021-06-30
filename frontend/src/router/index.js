import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/home/Home'
import About from '@/views/about/About'
import Login from '@/views/login/Login'
import Posts from '@/views/posts/Posts'
import PostView from '@/views/post-preview/PostView'
import PostEdit from '@/views/post-edit/PostEdit'
import PostCreate from '@/views/post-create/PostCreate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/post/:id/preview',
      name: 'post-view',
      component: PostView
    },
    {
      path: '/post/:id/edit',
      name: 'post-edit',
      component: PostEdit
    },
    {
      path: '/post/create',
      name: 'post-create',
      component: PostCreate
    },
  ]
})
