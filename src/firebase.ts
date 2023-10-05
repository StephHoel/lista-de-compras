// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAshxYjx5_0Vm28FAky4dokurwcoWyyZXM',
  authDomain: 'projeto-teste-290ea.firebaseapp.com',
  projectId: 'projeto-teste-290ea',
  storageBucket: 'projeto-teste-290ea.appspot.com',
  messagingSenderId: '51555867500',
  appId: '1:51555867500:web:41f9b4004fb580dd01b149',
  measurementId: 'G-W54F1Q2JHQ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

const db = getFirestore(app)

export default db
