import store from '@/store/store'
import Firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyAlbfEeJB9g1rkpYS7Yhn4TRqvRd4RkVEA',
  authDomain: 'mirror2019-b60e0.firebaseapp.com',
  databaseURL: 'https://mirror2019-b60e0.firebaseio.com',
  projectId: 'mirror2019-b60e0',
  storageBucket: 'mirror2019-b60e0.appspot.com',
  messagingSenderId: '555990526368'
}

export default {
  install: (Vue, options) => {
    const firebase = Firebase.initializeApp(config)
    const auth = firebase.auth()
    Vue.prototype.$auth = {
      login: async (username, pass) => {
        return await auth.signInWithEmailAndPassword(username, pass)
      },
      logout: async () => {
        await auth.signOut()
      }
    }
    auth.onAuthStateChanged(user => {
      store.commit('updateUser',{ user })
      store.dispatch('fetchUserData')
    })
  }
}