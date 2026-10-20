import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDG9zUyYoUQlkL7eGGFA5AO6_1CsBwSlQc',
  authDomain: 'lumo-educativo.firebaseapp.com',
  projectId: 'lumo-educativo',
  storageBucket: 'lumo-educativo.firebasestorage.app',
  messagingSenderId: '819232315420',
  appId: '1:819232315420:web:05196940fbd462facf27d9',
  measurementId: 'G-NDY1BDV7ZW',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
