import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

//need to shift these to somewhere secure
const firebaseConfig = {
  apiKey: 'AIzaSyDjPOdRe6Y9Z8cJ5LfGq57zLdtMIi0SZvY',
  authDomain: 'slide-writer.firebaseapp.com',
  projectId: 'slide-writer',
  storageBucket: 'slide-writer.appspot.com',
  messagingSenderId: '735568884900',
  appId: '1:735568884900:web:cfea2b8ab23dcdd35ca231',
  measurementId: 'G-JDWY79KL6D'
}

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }
