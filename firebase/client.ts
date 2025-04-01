import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB_g-23tUCmPmnC4Aa8HicZBDGNhiUReIo",
  authDomain: "preptalk-ai.firebaseapp.com",
  projectId: "preptalk-ai",
  storageBucket: "preptalk-ai.firebasestorage.app",
  messagingSenderId: "254098883060",
  appId: "1:254098883060:web:48aec218954d9e9b2379a1",
  measurementId: "G-R5WRYDCKPB"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)