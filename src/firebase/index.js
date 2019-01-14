import store from '@/store/store'
import Firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'YOUR_FIREBASE_API_KAY',
  authDomain: 'something.firebaseapp.com',
  databaseURL: 'https://something.firebaseio.com',
  projectId: 'something',
  storageBucket: 'something.appspot.com',
  messagingSenderId: 'SOME_NUMBER'
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