import { getApps, cert, initializeApp } from "firebase-admin/app"
import {getAuth} from "firebase-admin/auth"
import {getFirestore} from "firebase-admin/firestore"
const initFirebaseAdmin = ()=>{
    //it first tries to get access to the firebase applications
    const apps = getApps()

    //we are doing this check to avoid re-initializing the firebase app as we need only one instance of firebase app
    if(!apps.length){
        initializeApp({
            credential : cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey : process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
            })
        })
    }
    return {
        auth : getAuth(),
        db : getFirestore()
    }
}

export const {auth, db} = initFirebaseAdmin()