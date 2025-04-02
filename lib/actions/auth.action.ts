"use server"

import { db, auth } from "@/firebase/admin"
import { cookies } from "next/headers";

export async function signUp(params : SignUpParams){
    const {uid , name, email} = params

    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return {
                success : false,
                message : "User already exists. Please sign in instead."
            }
        }
        await db.collection('users').doc(uid).set({
            name ,email
        })
    } catch (e : any) {
        console.error('Error creating a user', e)
        if(e.code === 'auth/email-already-exists'){
            return {
                success: false,
                message : 'This email is already in use.'
            }
        }

        return {
            success: false,
            message : 'Something went wrong. Please try again later.'
        }
    }
}

export async function signIn(params : SignInParams){ 
    const {email, idToken} = params
    
    try {
        const userRecord = await auth.getUserByEmail(email)

        if(!userRecord){
            return {
                success : false,
                message : 'User does not exist. Create an account instead.'
            }
        }
        await setSessionCookie(idToken)
    } catch (e) {
        console.error(e)
        return {
            success : false,
            message : 'Failed to log into the account'
        }
    }
}

export async function setSessionCookie(idToken : string){
//we will be storing the cookies in the server side and then we will be using the cookies in the client side to authenticate the user
//hence the cookie will be stored in the nextStores cookie store
    const cookieStore = await cookies()

    const ONE_WEEK = 60 * 60 * 24 * 7 

    const sessionCookie = await auth.createSessionCookie(idToken, {
        //this session is set to expire in 7 days
        expiresIn: ONE_WEEK * 1000
    })

    cookieStore.set('session', sessionCookie, {
        maxAge : ONE_WEEK,
        //this is done for authetication requests
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        path : '/',
        sameSite : 'lax',
        
    })
}