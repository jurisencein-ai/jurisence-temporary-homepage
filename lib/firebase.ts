import { initializeApp, getApps, getApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyAYM8A8pKVfWA8XMZHcgh0mBoq8i8hKKcM",
  authDomain: "jurisence-653fd.firebaseapp.com",
  projectId: "jurisence-653fd",
  storageBucket: "jurisence-653fd.firebasestorage.app",
  messagingSenderId: "1023753804645",
  appId: "1:1023753804645:web:ca4e36817ae3672590df8c",
  measurementId: "G-JTNC121K3P"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export default app