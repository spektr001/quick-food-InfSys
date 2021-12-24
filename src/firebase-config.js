import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {

    apiKey: "AIzaSyCUL1waKzlqzAI0vYxwyk1Tj_B1DMQX39U",

    authDomain: "quickfood-633a3.firebaseapp.com",

    projectId: "quickfood-633a3",

    storageBucket: "quickfood-633a3.appspot.com",

    messagingSenderId: "627518859802",

    appId: "1:627518859802:web:83dcbaef8752a4ecbdffa3"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore()