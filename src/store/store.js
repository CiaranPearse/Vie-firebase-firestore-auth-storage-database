import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	user: null
  },
  mutations: {
    updateUser (state, { user }) {
      Vue.set(state, 'user', user)
    }
  },
  getters: {
  	user: state => state.user
  },
  actions: {
  }
})
