import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDmaCrGkzv4_jUFbX-uWfEAIRSL0Laum7k",
    authDomain: "crwn-db-6bfa6.firebaseapp.com",
    databaseURL: "https://crwn-db-6bfa6.firebaseio.com",
    projectId: "crwn-db-6bfa6",
    storageBucket: "crwn-db-6bfa6.appspot.com",
    messagingSenderId: "206805860919",
    appId: "1:206805860919:web:620aa9bd7f5df65a4675b2",
    measurementId: "G-ZFEL4RZ683"
};

export const createUserProfileDocuments = async(userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating User', error.message)
        }
    };
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
