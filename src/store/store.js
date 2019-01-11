import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore';
import router from '@/routes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userProfile: null,
    dummyProfile: null
  },
  mutations: {
    updateUser (state, { user }) {
      Vue.set(state, 'user', user)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setProfile (state, payload) {
      state.userProfile = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    userProfile (state) {
      return 'dsvfsdf'
    }
  },
  computed: {
  },
  actions: {
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.user.uid
          }
          commit('setUser', newUser)
        }
      )
      .then(
        // eslint-disable-next-line
        user => {
          const dateNow = new Date()
          firebase.firestore().collection("users").doc(this.state.user.id).set({
            userLevel: 'free',
            joinDate: dateNow.toISOString(),
            isAdmin: false
          })
        }
      )
      .then(
        router.push('/profile')
      )
      .catch(function(error) {
        console.log("Error getting document:", error)
        commit('setError', error)
      })
    },
    signUserOut ({commit}) {
      commit('setProfile', null)
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      var docRef = firebase.firestore().collection('/users').doc('HW6DHs7k5uQo99y1CZt25u7yeq22')
      docRef.get().then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data())
          commit('setProfile', doc.data())
          console.log(state.usersProfile)
        } else {
          console.log("No such document!")
          state.usersProfile = null
        }
      })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    }
  }
})
