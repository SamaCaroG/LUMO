import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDaOHs4miNGgSXUmICzQne5gR1fDU3cJ4c",
  authDomain: "lumo-educativo-e8c75.firebaseapp.com",
  projectId: "lumo-educativo-e8c75",
  storageBucket: "lumo-educativo-e8c75.firebasestorage.app",
  messagingSenderId: "897039497075",
  appId: "1:897039497075:web:809da8fcfaa8c6ccd7f706",
  measurementId: "G-9MF4T43YS3"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
