import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import AccessDenied from '@/components/access-denied/AccessDenied'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('AccessDenied', AccessDenied)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
