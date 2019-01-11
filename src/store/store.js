import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    updateUser (state, { user }) {
      Vue.set(state, 'user', user)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  getters: {
    user: state => state.user
  },
  actions: {
    signUserUp ({commit}, payload) {
      console.log(payload)
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
        user => {
          const dateNow = new Date()
          console.log(this.state.user.id)
          firebase.firestore().collection("users").doc(this.state.user.id).set({
            firstName: 'Saga',
            lastName: 'Dash',
            location: 'Cork, Ireland',
            longitude: '-8.486316',
            latitude: '51.896893',
            timeZone: 'GMT',
            language: 'en_US',
            currency: 'USD',
            avatar: 'http://ciaranfoley.com/assets/img/author/perry.jpg',
            userLevel: 'free',
            joinDate: dateNow.toISOString(),
            isAdmin: false
          })
        }
      )
      // .then(
      //   user => {
      //     router.push('/profile')
      //   }
      // )
      // .catch(
      //   error => {
      //     console.log('Error on signup: ', error)
      //   }
      // )
    }
  }
})
