import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import Vuetify from 'vuetify'
import router from './routes'
import store from './store/store'
import FirebaseAuthPlugin from './firebase/'

Vue.config.productionTip = false
Vue.use(FirebaseAuthPlugin)
Vue.use(Vuetify)

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// const app = new Vue({
//   router,
//   store,
//   ...App
// })

export { router, store }
